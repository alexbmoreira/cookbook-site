import { makeAutoObservable } from 'mobx';

class RecipeIngredientViewModel {
  isEditing;
  data;
  index;

  constructor(data, isEditing, index) {
    this.data = data;
    this.isEditing = isEditing;
    this.index = index;
    makeAutoObservable(this);
  }

  get quantity() {
    return this.data.quantity
  }
  
  get measurement() {
    return this.data.measurement
  }

  get name() {
    return this.data.name
  }
}

export default RecipeIngredientViewModel;