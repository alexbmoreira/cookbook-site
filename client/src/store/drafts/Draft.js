import DomainObject from '../DomainObject';
import { makeObservable, observable } from 'mobx';

class Draft extends DomainObject {
  draftObject = {};
  autosavedAt = '';

  constructor(model) {
    super();
    makeObservable(this, {
      draftObject: observable,
      autosavedAt: observable
    });

    this.merge(model);
  }
}

export default Draft;
