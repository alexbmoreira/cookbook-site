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
    const id = matchPath({ path: "/recipes/:id" }, window.location.pathname).params.id
    const recipes = require('../../../api/recipes').recipes.map((recipe) => new Recipe(recipe));

    this.recipe = recipes.find((r) => r.id === id)
  }
}

export default RecipesContainerState;

