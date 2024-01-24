import { makeObservable, observable } from 'mobx';
import DomainObject from '../DomainObject';
import { v4 as uuidv4 } from 'uuid';

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
}

export default RecipeIngredient;
