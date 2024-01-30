import _ from 'lodash';
import {makeAutoObservable} from 'mobx';
import { patchData } from '../api/api.service';

class Autosaver {
  status = '';
  draft = {};

  constructor(draft) {
    makeAutoObservable(this);

    this.draft = draft;
    this.autosave = _.debounce(this.__performAutosave, 500, {
      maxWait: 30000
    });
  }

  async __performAutosave() {
    this.status = 'saving';
    this.draft.autosavedAt = Date.now();
    await patchData(`/drafts/${this.draft.id}`, this.draft);
    this.status = 'saved';
  }
}

export default function setupAutosave(draft) {
  return new Autosaver(draft);
}
