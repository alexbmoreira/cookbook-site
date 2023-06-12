import { makeObservable, observable, computed, action } from 'mobx';
import { Recipe } from '../../../store';
import _ from 'lodash';
import CATEGORIES from './categories';
import { fetchData } from '../../../api/api.service'

const CATEGORY_ORDERS = {
  'breakfast': 1,
  'soup': 2,
  'side': 3,
  'pasta': 4,
  'meat_and_poultry': 5,
  'fish': 6,
  'dessert': 7,
  'misc': 8
};

class HomeContainerState {
  recipes = [];
  search = '';
  category = CATEGORIES[0];

  constructor() {
    makeObservable(this, {
      recipes: observable,
      search: observable,
      category: observable,
      load: action,
      updateSearch: action,
      updateCategory: action,
      sortedRecipes: computed,
      filteredRecipes: computed,
      searchedRecipes: computed,
    });
  }

  async load() {
    const recipes = await fetchData('/recipes?category=all')
    this.recipes = recipes.map((recipe) => new Recipe(recipe));
  }

  updateSearch(value) {
    this.search = value;
  }

  updateCategory(value) {
    this.category = value;
  }

  get sortedRecipes() {
    return _.sortBy(this.recipes, [(r) => CATEGORY_ORDERS[r.category], 'name'])
  }

  get filteredRecipes() {
    if (this.category.value === 'all') return this.sortedRecipes;

    return this.sortedRecipes.filter((recipe) => recipe.category === this.category.value);
  }

  get searchedRecipes() {
    if (!this.search) return this.filteredRecipes;

    return this.filteredRecipes.filter((recipe) => recipe.name.toLowerCase().includes(this.search.toLowerCase()));
  }
}

export default HomeContainerState;

