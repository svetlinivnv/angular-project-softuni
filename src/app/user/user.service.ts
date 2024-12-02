import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  hasUser: boolean = false;

  firebaseAuth = inject(Auth);

  register(
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

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
