import { makeObservable, observable } from 'mobx';
import DomainObject from '../DomainObject';

class Note extends DomainObject {
  body = '';

  constructor(model) {
    super();
    makeObservable(this, {
      body: observable
    });

    this.merge(model);
  }
}

export default Note;
