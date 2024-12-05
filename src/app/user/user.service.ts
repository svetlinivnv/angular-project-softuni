import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { UserDocument } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  hasUser: boolean = false;

  firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  register(username: string, email: string, password: string): Observable<any> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
      .then((response) => {
        return updateProfile(response.user, { displayName: username }).then(
          () => response.user
        );
      })
      .then((user) => {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        const userDocument: UserDocument = {
          uid: user.uid,
          email: user.email!,
          username: user.displayName!,
          profileImgUrl: null,
          createdAt: new Date().toISOString(),
        };
        return setDoc(userDocRef, userDocument).then(() => {
          this.storeSession(user);
          return user;
        });
      });

    return from(promise);
  }

  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) => {
      const user = response.user;
      this.storeSession(user);
      return user;
    });

    return from(promise);
  }

  storeSession(user: User) {
    const sessionData = {
      uid: user.uid,
      email: user.email,
      username: user.displayName,
    };
    localStorage.setItem('user', JSON.stringify(sessionData));
  }

  getSession() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  clearSession() {
    localStorage.removeItem('user');
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut().then(() => {
      this.clearSession();
    });
    return from(promise);
  }

  get isLogged(): boolean {
    return !!this.getSession();
  }
}
