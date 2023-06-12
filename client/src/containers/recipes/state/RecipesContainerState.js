import { makeObservable, observable, action, computed } from 'mobx';
import { matchPath } from 'react-router';
import { Recipe } from '../../../store';
import { fetchData } from '../../../api/api.service'

class RecipesContainerState {
  recipe = {};
  servings = 0;

  constructor() {
    makeObservable(this, {
      recipe: observable,
      servings: observable,
      load: action,
      updateServings: action,
      relativeServings: computed
    });
  }

  async load() {
    const slug = matchPath({ path: "/recipes/:slug" }, window.location.pathname).params.slug;
    const recipe = await fetchData(`/recipes/${slug}`);

    this.recipe = new Recipe(recipe);
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

