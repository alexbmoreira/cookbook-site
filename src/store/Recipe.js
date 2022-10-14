import _ from 'lodash';

class Recipe {
  constructor(model) {
    _.merge(this, model);
  }

  get timeEstimate() {
    var time = 0;
    if (this.prepTime) time += this.prepTime;
    if (this.cookTime) time += this.cookTime;

    return time || 0;
  }
}

export default Recipe;
