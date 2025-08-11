import { makeObservable, observable } from 'mobx';
import DomainObject from '../DomainObject';
import { v4 as uuidv4 } from 'uuid';
import { fraction, multiply } from 'mathjs'

class RecipeIngredient extends DomainObject {
  id;
  quantity = '';
  measurement = '';
  name = '';

  constructor(model) {
    super();
    makeObservable(this, {
      quantity: observable,
      measurement: observable,
      name: observable
    });

    this.merge(model);
    if (!this.id) this.id = uuidv4();
  }

  fractionalQuantity(servings) {
    return this.quantity ? multiply(fraction(this.quantity), servings).toFraction(true) : '';
  }

  ingredientString(servings) {
    return `${this.fractionalQuantity(servings)} ${this.measurement} ${this.name}`;
  }
}

export default RecipeIngredient;
