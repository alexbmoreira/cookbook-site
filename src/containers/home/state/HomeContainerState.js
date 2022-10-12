import { makeObservable, observable, computed, action } from 'mobx';
import { Recipe } from '../../../store';
import CATEGORIES from './categories';

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
      searchedRecipes: computed,
      filteredRecipes: computed
    });
  }

  async load() {
    this.recipes = require('../../../api/recipes').recipes.map((recipe) => new Recipe(recipe));
  }

  updateSearch(value) {
    this.search = value;
  }

  updateCategory(value) {
    this.category = value;
  }

  get filteredRecipes() {
    if (this.category.value === 'all') return this.recipes;

    return this.recipes.filter((recipe) => recipe.category === this.category.value);
  }

  get searchedRecipes() {
    if (!this.search) return this.filteredRecipes;

    return this.filteredRecipes.filter((recipe) => recipe.name.toLowerCase().includes(this.search.toLowerCase()));
  }
}

export default HomeContainerState;

