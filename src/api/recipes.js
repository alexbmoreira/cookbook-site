import _ from 'lodash';

const recipes = [
  require('./catalog/breakfast/chocolate_chip_pancakes'), // 1
  require('./catalog/breakfast/french_toast'), // 2
  require('./catalog/breakfast/hash_browns'), // 3
  require('./catalog/breakfast/scrambled_eggs'), // 4
  require('./catalog/soup/caldo_verde'), // 5
  require('./catalog/side/sweet_potato_casserole'), // 6
  require('./catalog/meat_and_poultry/chicken_yakitori_bowl'), // 8
  require('./catalog/dessert/creme_brulee'), // 7
]

if (_.uniqBy(recipes, 'id').length !== recipes.length) {
  throw new Error('Duplicate ids in recipes');
}

export { recipes };
