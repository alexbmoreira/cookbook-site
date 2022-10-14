var _ = require('lodash');
var slugify = require('slugify');

var recipes = [
  require('./catalog/meat_and_poultry/almond_crusted_chicken'),
  require('./catalog/fish/maple_dijon_salmon'),
  require('./catalog/meat_and_poultry/pan_seared_steak'),
  require('./catalog/soup/caldo_verde'),
  require('./catalog/side/garlic_roasted_potatoes'),
  require('./catalog/dessert/banana_bread'),
  require('./catalog/breakfast/chocolate_chip_pancakes'),
  require('./catalog/side/sweet_potato_casserole'),
  require('./catalog/breakfast/scrambled_eggs'),
  require('./catalog/breakfast/hash_browns'),
  require('./catalog/side/mashed_potatoes'),
  require('./catalog/breakfast/french_toast'),
  require('./catalog/meat_and_poultry/chicken_yakitori_bowl'),
  require('./catalog/dessert/creme_brulee'),
  require('./catalog/pasta/pasta_carbonara'),
  require('./catalog/dessert/famous_pumpkin_pie.json'),
  require('./catalog/pasta/macs_famous_mac_and_cheese.json'),
]

recipes = _.map(recipes, (r) => _.merge({ slug: slugify(r.name, { lower: true, remove: /[*+~.()'"!:@]/g }) }, r));

if (_.uniqBy(recipes, 'slug').length !== recipes.length) {
  throw new Error('Duplicate ids in recipes');
}

module.exports = recipes;
