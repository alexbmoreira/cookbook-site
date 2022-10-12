import _ from 'lodash';

class Recipe {
  constructor(model) {
    _.merge(this, model);
  }

  get totalTime() {
    var time = 0;
    if (this.prepTime) time += this.prepTime;
    if (this.cookTime) time += this.cookTime;
    if (this.restTime) time += this.restTime;

    return time;
  }
}

export default Recipe;
