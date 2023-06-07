import { makeObservable, observable, action, computed } from 'mobx';
import { matchPath } from 'react-router';
import { Recipe } from '../../../store';

class RecipesContainerState {
  recipes = [];
  servings = 0;

  constructor() {
    makeObservable(this, {
      recipes: observable,
      servings: observable,
      load: action,
      updateServings: action,
      relativeServings: computed
    });
  }

  async load() {
    const slug = matchPath({ path: "/recipes/:slug" }, window.location.pathname).params.slug
    const recipes = require('../../../api/recipes').map((recipe) => new Recipe(recipe));

    this.recipe = recipes.find((r) => r.slug === slug)
    this.servings = this.recipe.servings;
  }

  updateServings(servings) {
    this.servings = servings;
  }

  get relativeServings() {
    return this.servings / this.recipe.servings;
  }
}

export default RecipesContainerState;

