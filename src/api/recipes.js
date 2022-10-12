import _ from 'lodash';

const recipes = [
  _.merge({ id: "1" }, require('./catalog/breakfast/chocolate_chip_pancakes')),
  _.merge({ id: "2" }, require('./catalog/breakfast/french_toast')),
  _.merge({ id: "3" }, require('./catalog/breakfast/hash_browns')),
  _.merge({ id: "4" }, require('./catalog/breakfast/scrambled_eggs')),
  _.merge({ id: "7" }, require('./catalog/dessert/creme_brulee')),
  _.merge({ id: "8" }, require('./catalog/meat_and_poultry/chicken_yakitori_bowl')),
  _.merge({ id: "9" }, require('./catalog/meat_and_poultry/pan_seared_steak')),
  _.merge({ id: "6" }, require('./catalog/side/sweet_potato_casserole')),
  _.merge({ id: "5" }, require('./catalog/soup/caldo_verde')),
]

if (_.uniqBy(recipes, 'id').length !== recipes.length) {
  throw new Error('Duplicate ids in recipes');
}

export { recipes };
