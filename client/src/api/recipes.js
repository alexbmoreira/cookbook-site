import _ from 'lodash';
import slugify from 'slugify';

const modules = import.meta.glob('./catalog/**/*.json', { eager: true });

const recipes = Object.entries(modules).map(([path, module]) => {
  const recipe = module.default;
  return _.merge(
    { slug: slugify(recipe.name, { lower: true, remove: /[*+~.()'"!:@]/g }) },
    recipe
  );
});

if (_.uniqBy(recipes, 'slug').length !== recipes.length) {
  throw new Error('Duplicate ids in recipes');
}

export default recipes;
