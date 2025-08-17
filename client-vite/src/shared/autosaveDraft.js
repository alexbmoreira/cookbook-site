import { fetchData } from '../api/api.service';
import { Draft } from '@store/drafts';
import { makeAutoObservable } from 'mobx';
import setupAutosave from './autosave';

class DraftAutosaver {
  draft;
  model;

  constructor(model) {
    makeAutoObservable(this);
    this.model = model;
  }

  async setup(draftParams) {
    const draftModel = await fetchData(`/drafts/find_by_draftable?draftable_id=${draftParams.id}&draftable_type=${draftParams.type}`);
    this.draft = new Draft(draftModel);
    this.model.merge(this.draft.draftObject);
    this.model.draftableId = draftParams.id;
    this.model.draftableType = draftParams.type;

    this.autosaver = setupAutosave(this.draft);
  }

  async autosave() {
    this.draft.draftObject = this.model;
    this.autosaver.autosave();
  }

  clearAutosaver() {
    delete this.model.draftableId;
    delete this.model.draftableType;
    delete this.model.autosaver;
  }

  get status() {
    return this.autosaver.status;
  }
}

export default async function setupAutosaveDraft(model, draftParams) {
  if (model.autosaver) {
    throw new Error('Model already has an autosaver');
  }

  const draftAutosaver = new DraftAutosaver(model);
  await draftAutosaver.setup(draftParams);

  Object.defineProperty(
    model,
    'autosaver',
    {
      configurable: true,
      get: () => draftAutosaver
    }
  );
}
