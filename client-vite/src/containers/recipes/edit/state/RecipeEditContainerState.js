import { makeAutoObservable } from 'mobx';
import api, { postData, fetchData, patchData } from '../../../../api/api.service';
import { matchPath } from 'react-router';
import { Recipe, Image } from '../../../../store/recipes';
import RecipeIngredientViewModel from './RecipeIngredientViewModel.js';
import { setupAutosaveDraft } from '../../../../shared';
import _ from 'lodash';

class RecipeEditContainerState {
  recipe = {};
  errors = {};
  servings = 0;
  loadingImage = false;

  constructor() {
    makeAutoObservable(this);
  }

  async load() {
    const match = matchPath({ path: '/recipes/:slug/edit' }, window.location.pathname)

    if (match) {
      const slug = match.params.slug;
      const recipe = await fetchData(`/recipes/${slug}`);
      this.recipe = new Recipe(recipe);
    } else {
      this.recipe = new Recipe();
      await setupAutosaveDraft(
        this.recipe,
        {id: 'new', type: 'recipes'}
      );
    }
  }

  updateValue(field, value) {
    this.recipe[field] = value;
    if (this.recipe.autosaver) this.recipe.autosaver.autosave();
  }

  removeRecipeIngredient(recipeIngredientViewModel) {
    _.remove(this.recipe.recipeIngredients, recipeIngredientViewModel);
    if (this.recipe.autosaver) this.recipe.autosaver.autosave();
  }

  async saveRecipe() {
    const {model, errors} = this.recipe.isNew ?
      await postData('/recipes', this.recipe) :
      await patchData(`/recipes/${this.recipe.id}`, this.recipe);

    this.errors = errors;
    if (model) {
      window.location = `/recipes/${model.slug}`;
    }
  }

  async saveImage(image) {
    if (!image) {
      this.recipe.image = {};
      return;
    }

    this.loadingImage = true;
    const formData = new FormData();
    formData.append('image', image);

    const response = await api.post(`/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    this.recipe.image = new Image(response.data);
    this.loadingImage = false;
    if (this.recipe.autosaver) this.recipe.autosaver.autosave();
  }

  get recipeIngredientViewModels() {
    return this.recipe.recipeIngredients.map((recipeIngredient, index) => new RecipeIngredientViewModel(recipeIngredient, false, index))
  }

  get canEditRecipeIngredient() {
    return !_.find(this.recipeIngredientViewModels, 'isEditing')
  }
}

export default RecipeEditContainerState;