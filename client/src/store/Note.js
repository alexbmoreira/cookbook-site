import { computed, makeObservable, observable } from 'mobx';
import _ from 'lodash';

class Note {
  body = '';

  constructor(model) {
    makeObservable(this, {
      body: observable,
      isNew: computed
    });

    _.merge(this, model);
  }

  get isNew() {
    return !this.id;
  }
}

export default Note;
