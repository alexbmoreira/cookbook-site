import _ from 'lodash';

const recipes = [
  require('./catalog/breakfast/chocolate_chip_pancakes'),
  require('./catalog/breakfast/french_toast'),
  require('./catalog/breakfast/hash_browns'),
  require('./catalog/breakfast/scrambled_eggs'),
  require('./catalog/soup/caldo_verde'),
  require('./catalog/side/sweet_potato_casserole')
]

if (_.uniqBy(recipes, 'id').length !== recipes.length) {
  throw new Error('Duplicate ids in recipes');
}

export { recipes };
