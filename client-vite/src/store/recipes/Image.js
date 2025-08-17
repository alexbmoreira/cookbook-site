import { makeObservable, observable } from 'mobx';
import DomainObject from '../DomainObject';

class Image extends DomainObject {
  originalFilename = '';
  key = '';
  path = '';

  constructor(model) {
    super();
    makeObservable(this, {
      originalFilename: observable,
      key: observable,
      path: observable
    });

    this.merge(model);
  }
}

export default Image;
