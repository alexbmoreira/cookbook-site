const _ = require('lodash');
const slugify = require('slugify');

const requireModule = require.context('./catalog/', true, /\.json$/);

const recipes = requireModule.keys().map(filename => {
  const recipe = require(`./catalog/${filename.replace(/(\.\/|\.json)/g, '')}`);
  return _.merge({slug: slugify(recipe.name, { lower: true, remove: /[*+~.()'"!:@]/g }) }, recipe);
});

if (_.uniqBy(recipes, 'slug').length !== recipes.length) {
  throw new Error('Duplicate ids in recipes');
}

module.exports = recipes;
