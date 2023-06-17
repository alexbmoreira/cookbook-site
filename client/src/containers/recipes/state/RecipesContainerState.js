import { makeObservable, observable, action, computed } from 'mobx';
import { matchPath } from 'react-router';
import { Recipe, Note, authStore } from '../../../store';
import { fetchData, postData, patchData, deleteData } from '../../../api/api.service'
import _ from 'lodash';

class RecipesContainerState {
  recipe = {};
  servings = 0;
  notes = {};
  notesEdited = false;

  constructor() {
    makeObservable(this, {
      recipe: observable,
      servings: observable,
      notes: observable,
      notesEdited: observable,
      load: action,
      updateServings: action,
      updateNotesBody: action,
      saveNotes: action,
      relativeServings: computed
    });
  }

  async load() {
    const slug = matchPath({ path: "/recipes/:slug" }, window.location.pathname).params.slug;
    const recipe = await fetchData(`/recipes/${slug}`);
    const notes = authStore.isLoggedIn ? await fetchData(`/recipes/${slug}/user_notes`) : {};

    this.recipe = new Recipe(recipe);
    this.servings = this.recipe.servings;
    this.notes = new Note(notes);
  }

  updateServings(servings) {
    this.servings = servings;
  }

  updateNotesBody(value) {
    _.merge(this.notes, { body: value })
    this.notesEdited = true;
  }

  async saveNotes() {
    const {model} = this.notes.isNew ?
      await postData('/notes', _.merge(this.notes, {recipe: this.recipe})) :
      await patchData(`/notes/${this.notes.id}`, this.notes)

    this.notes = new Note(model);
    this.notesEdited = false;
  }

  async deleteNotes() {
    await deleteData(`/notes/${this.notes.id}`)
    this.notes = new Note();
    this.notesEdited = false;
  }

  get relativeServings() {
    return this.servings / this.recipe.servings;
  }
}

export default RecipesContainerState;

