import { makeAutoObservable } from 'mobx';
import { matchPath } from 'react-router';
import { Recipe, Note } from '../../../../store/recipes';
import { authStore } from '../../../../store';
import { fetchData, postData, patchData, deleteData } from '../../../../api/api.service';
import { toast } from 'react-toastify';
import _ from 'lodash';

class RecipesContainerState {
  recipe = {};
  servings = 0;
  notes = {};
  notesEdited = false;

  deleteRecipeModalOpen = false;

  constructor() {
    makeAutoObservable(this);
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

  openDeleteRecipeModal() {
    this.deleteRecipeModalOpen = true;
  }

  closeDeleteRecipeModal() {
    this.deleteRecipeModalOpen = false;
  }

  async deleteRecipe() {
    await deleteData(`recipes/${this.recipe.id}`);
    this.closeDeleteRecipeModal();
    window.location = '/';
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

  async shareRecipe() {
    if (navigator.share) {
      await navigator.share({
        title: this.recipe.name,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast('Copied to clipboard!')
    }
  }

  get canEditRecipe() {
    return authStore.adminIsActive && authStore.currentUser.id === this.recipe.createdByUserId;
  }

  goToEditRecipe() {
    window.location = `/recipes/${this.recipe.slug}/edit`;
  }
}

export default RecipesContainerState;