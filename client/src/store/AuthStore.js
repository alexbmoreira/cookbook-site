import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';

class AuthStore {
  isLoggedIn = !!Cookies.get('isLoggedIn');

  constructor() {
    makeAutoObservable(this);
  }

  login = () => {
    Cookies.set('isLoggedIn', 'true');
    this.isLoggedIn = true;
    window.location.reload()
  }

  logout = () => {
    Cookies.remove('isLoggedIn');
    this.isLoggedIn = false;
    window.location.reload()
  }
}

const authStore = new AuthStore();
export default authStore;
