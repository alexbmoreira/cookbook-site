import _ from 'lodash';

const recipes = [
  _.merge({ id: "1" },  require('./catalog/meat_and_poultry/almond_crusted_chicken')),
  _.merge({ id: "2" },  require('./catalog/fish/maple_dijon_salmon')),
  _.merge({ id: "3" },  require('./catalog/meat_and_poultry/pan_seared_steak')),
  _.merge({ id: "4" },  require('./catalog/soup/caldo_verde')),
  _.merge({ id: "5" },  require('./catalog/side/garlic_roasted_potatoes')),
  _.merge({ id: "6" },  require('./catalog/dessert/banana_bread')),
  _.merge({ id: "7" },  require('./catalog/breakfast/chocolate_chip_pancakes')),
  _.merge({ id: "8" },  require('./catalog/side/sweet_potato_casserole')),
  _.merge({ id: "9" },  require('./catalog/breakfast/scrambled_eggs')),
  _.merge({ id: "10" }, require('./catalog/breakfast/hash_browns')),
  _.merge({ id: "11" }, require('./catalog/side/mashed_potatoes')),
  _.merge({ id: "12" }, require('./catalog/breakfast/french_toast')),
  _.merge({ id: "13" }, require('./catalog/meat_and_poultry/chicken_yakitori_bowl')),
  _.merge({ id: "14" }, require('./catalog/dessert/creme_brulee')),
  _.merge({ id: "15" }, require('./catalog/pasta/pasta_carbonara')),
  _.merge({ id: "16" }, require('./catalog/dessert/famous_pumpkin_pie.json')),
]

if (_.uniqBy(recipes, 'id').length !== recipes.length) {
  throw new Error('Duplicate ids in recipes');
}

export { recipes };
