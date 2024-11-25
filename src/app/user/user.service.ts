import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  hasUser: boolean = false;

  get isLogged(): boolean {
    return this.hasUser;
  }

  constructor() {}

  logout() {
    this.hasUser = false;
  }

  login() {
    this.hasUser = true;
  }
}
