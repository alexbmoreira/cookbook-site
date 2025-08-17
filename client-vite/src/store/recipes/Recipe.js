import { makeObservable, observable, computed } from 'mobx';
import _ from 'lodash';
import DomainObject from '../DomainObject';
import RecipeIngredient from './RecipeIngredient';
import Image from './Image';

class Recipe extends DomainObject {
  name = '';
  image = {};
  category = '';
  prepTime = '';
  cookTime = '';
  restTime = '';
  servings = 2;
  recipeIngredients = [];
  steps = '';
  createdByUserId = '';

  constructor(model) {
    super();
    makeObservable(this, {
      name: observable,
      image: observable,
      category: observable,
      prepTime: observable,
      cookTime: observable,
      restTime: observable,
      servings: observable,
      recipeIngredients: observable,
      steps: observable,
      createdByUserId: observable,
      timeEstimate: computed,
      hasImage: computed
    });

    this.merge(model, {
      recipeIngredients: [RecipeIngredient],
      image: Image
    });
  }

  get timeEstimate() {
    var time = 0;
    if (this.prepTime) time += this.prepTime;
    if (this.cookTime) time += this.cookTime;

    return time || 0;
  }

  get hasImage() {
    return !_.isEmpty(this.image);
  }
}

export default Recipe;
