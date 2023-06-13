import { makeAutoObservable } from 'mobx';

class AuthStore {
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  login = () => {
    this.isLoggedIn = true;
  }

  logout = () => {
    this.isLoggedIn = false;
  }
}

const authStore = new AuthStore();
export default authStore;
