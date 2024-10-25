import { makeAutoObservable } from "mobx";

class AuthStore {
  token = "";

  constructor() {
    makeAutoObservable(this);
  }

  signIn = (value: string) => {
    this.token = value;
  };

  logout = () => {
    this.token = "";
  };
}

export default new AuthStore();
