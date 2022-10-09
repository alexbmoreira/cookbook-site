import { makeAutoObservable } from 'mobx';

class HomeContainerState {
  recipes;

  constructor() {
    makeAutoObservable(this);
  }

  async load() {
    this.recipes = require('../../../api/recipes');
  }
}

export default HomeContainerState;

