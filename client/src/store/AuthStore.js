import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';
import _ from 'lodash';

class AuthStore {
  currentUser = !!Cookies.get('currentUser') ? JSON.parse(Cookies.get('currentUser')) : {};

  constructor() {
    makeAutoObservable(this);
  }

  login = (currentUser) => {
    Cookies.set('currentUser', JSON.stringify(currentUser));
    this.currentUser = currentUser;
    window.location.reload();
  }

  logout = () => {
    Cookies.remove('currentUser');
    this.currentUser = {};
    window.location.reload();
  }

  get isLoggedIn() {
    return !_.isEmpty(this.currentUser);
  }

  get isAdmin() {
    return this.currentUser.admin;
  }

  get adminIsActive() {
    return this.isLoggedIn && this.isAdmin;
  }
}

const authStore = new AuthStore();
export default authStore;
