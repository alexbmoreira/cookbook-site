const functions = require('firebase-functions');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const API_BASE = process.env.API_BASE;
const SITE_URL = 'https://twoscompanycookbook.com';

let spaHtml;
try {
  spaHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
} catch {
  spaHtml = '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/"></head></html>';
}

const BOT_AGENTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
  'whatsapp', 'telegrambot', 'slackbot', 'discordbot', 'applebot',
  'pinterestbot', 'embedly', 'quora link preview', 'rogerbot',
  'vkshare', 'w3c_validator', 'curl', 'wget', 'python-requests',
  'python-urllib',
];

function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some(bot => ua.includes(bot));
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function durationToISO8601(totalMinutes) {
  if (!totalMinutes) return undefined;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - (hours * 60);
  const hoursString = hours ? `${hours}H` : '';
  const minutesString = minutes ? `${minutes}M` : '';
  return `PT${hoursString}${minutesString}`;
}

function parseRecipeSteps(html) {
  if (!html) return [];
  const $ = cheerio.load(html);
  const steps = [];

  $('p').each((_, el) => {
    const text = $(el).text().trim();
    if (text) steps.push(text);
  });

  if (steps.length === 0) {
    $('ol li, ul li').each((_, el) => {
      const text = $(el).text().trim();
      if (text) steps.push(text);
    });
  }

  return steps.map((step, index) => ({
    '@type': 'HowToStep',
    name: `Step ${index + 1}`,
    text: step,
  }));
}

function ingredientString(ingredient) {
  return [ingredient.quantity, ingredient.measurement, ingredient.name]
    .filter(Boolean)
    .join(' ')
    .trim();
}

async function fetchRecipe(slug) {
  const response = await fetch(`${API_BASE}/recipes/${slug}`, {
    headers: { 'Accept': 'application/json' },
  });
  if (!response.ok) return null;
  return response.json();
}

function buildHtml(recipe) {
  const imageUrl = recipe.image ? recipe.image.path : '';
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const description = escapeHtml(
    `${recipe.name} - ${recipe.category}. Prep: ${recipe.prepTime} min. Serves ${recipe.servings}.`
  );
  const recipeName = escapeHtml(recipe.name);
  const recipeUrl = `${SITE_URL}/recipes/${recipe.slug}`;

  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.name,
    image: imageUrl,
    prepTime: durationToISO8601(recipe.prepTime),
    cookTime: durationToISO8601(recipe.cookTime),
    totalTime: durationToISO8601(totalTime),
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    recipeIngredient: (recipe.recipeIngredients || []).map(ingredientString),
    recipeInstructions: parseRecipeSteps(recipe.steps),
  };

  Object.keys(schemaData).forEach(key => {
    if (schemaData[key] === undefined) delete schemaData[key];
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${recipeName} - Two's Company Cookbook</title>
  <meta name="description" content="${description}">

  <!-- Open Graph -->
  <meta property="og:title" content="${recipeName}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">
  <meta property="og:url" content="${recipeUrl}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Two's Company Cookbook">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${recipeName}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">${JSON.stringify(schemaData)}</script>
</head>
<body>
  <noscript>
    <h1>${recipeName}</h1>
    <p>${description}</p>
  </noscript>
</body>
</html>`;
}

exports.ssrRecipe = functions.https.onRequest(async (req, res) => {
  const pathMatch = req.path.match(/^\/recipes\/([^/]+)\/?$/);

  if (!pathMatch || pathMatch[1] === 'new') {
    res.status(200).send(spaHtml);
    return;
  }

  const slug = pathMatch[1];

  if (slug.endsWith('/edit')) {
    res.status(200).send(spaHtml);
    return;
  }

  if (!isBot(req.headers['user-agent'])) {
    res.set('Cache-Control', 'public, max-age=300');
    res.status(200).send(spaHtml);
    return;
  }

  try {
    const recipe = await fetchRecipe(slug);
    if (!recipe) {
      res.status(404).send(spaHtml);
      return;
    }

    res.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.status(200).send(buildHtml(recipe));
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).send(spaHtml);
  }
});
