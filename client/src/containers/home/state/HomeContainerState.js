import { makeAutoObservable } from 'mobx';
import { Recipe } from '../../../store';
import { fetchData } from '../../../api/api.service'


class HomeContainerState {
  recipes = [];
  search = '';
  category = '';
  fetchingRecipes = true;

  constructor() {
    makeAutoObservable(this);
  }

  async load() {
    this.fetchingRecipes = true;
    const recipes = await fetchData(`/recipes?search=${this.search}&category=${this.category}`)
    this.recipes = recipes.map((recipe) => new Recipe(recipe));
    this.fetchingRecipes = false;
  }

  async updateSearch(value) {
    this.search = value;
    await this.load();
  }

  async updateCategory(value) {
    this.category = value;
    await this.load();
  }
}

export default HomeContainerState;

