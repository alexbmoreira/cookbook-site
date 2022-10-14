import { makeObservable, observable, action } from 'mobx';
import { matchPath } from 'react-router';
import { Recipe } from '../../../store';

class RecipesContainerState {
  recipes = [];

  constructor() {
    makeObservable(this, {
      recipes: observable,
      load: action
    });
  }

  async load() {
    const slug = matchPath({ path: "/recipes/:slug" }, window.location.pathname).params.slug
    const recipes = require('../../../api/recipes').map((recipe) => new Recipe(recipe));

    this.recipe = recipes.find((r) => r.slug === slug)
  }
}

export default RecipesContainerState;

