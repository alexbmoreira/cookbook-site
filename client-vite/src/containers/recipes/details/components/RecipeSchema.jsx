import { useEffect } from 'react';
import { durationToISO8601 } from '../../../../shared';

const parseRecipeSteps = (html) => {
  if (!html) return [];

  const temp = document.createElement('div');
  temp.innerHTML = html;

  let steps = [];

  const paragraphs = temp.querySelectorAll('p');
  paragraphs.forEach(p => {
    const text = p.textContent.trim();
    if (text) steps.push(text);
  });

  if (steps.length === 0) {
    const lists = temp.querySelectorAll('ol, ul');
    if (lists.length > 0) {
      lists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach(item => {
          const text = item.textContent.trim();
          if (text) steps.push(text);
        });
      });
    }
  }

  return steps.map((step, index) => ({
    '@type': 'HowToStep',
    'name': `Step ${index + 1}`,
    'text': step
  }));
};

const RecipeSchema = ({ recipe }) => {
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org/',
      '@type': 'Recipe',
      'name': recipe.name,
      'image': recipe.image ? recipe.image.path : '',
      'prepTime': durationToISO8601(recipe.prepTime), // e.g., 'PT30M' for 30 minutes
      'cookTime': durationToISO8601(recipe.cookTime),
      'totalTime': durationToISO8601(recipe.timeEstimate),
      'recipeYield': recipe.servings,
      'recipeCategory': recipe.category,
      'recipeIngredient': recipe.recipeIngredients.map(ingredient => ingredient.ingredientString(recipe.servings)),
      'recipeInstructions': parseRecipeSteps(recipe.steps)
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [recipe]);
};

export default RecipeSchema;