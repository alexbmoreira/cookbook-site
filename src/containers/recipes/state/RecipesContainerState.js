import { makeAutoObservable } from 'mobx';
import { matchPath } from 'react-router'

class RecipesContainerState {
  recipes;

  constructor() {
    makeAutoObservable(this);
  }

  async load() {
    const id = matchPath({ path: "/recipes/:id" }, window.location.pathname).params.id
    const recipes = require('../../../api/recipes');

    this.recipe = recipes.find((r) => r.id === id)
  }
}

export default RecipesContainerState;

