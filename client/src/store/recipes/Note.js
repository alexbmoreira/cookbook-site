import { makeObservable, observable } from 'mobx';
import DomainObject from '../DomainObject';
import _ from 'lodash';

class Note extends DomainObject {
  body = '';

  constructor(model) {
    super();
    makeObservable(this, {
      body: observable
    });

    _.merge(this, model);
  }
}

export default Note;
