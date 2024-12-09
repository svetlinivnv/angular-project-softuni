import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from, switchMap } from 'rxjs';
import { UserDocument } from '../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  hasUser: boolean = false;

  firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  register(username: string, email: string, password: string) {
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
          phoneNumber: user.phoneNumber,
          username: user.displayName!,
          photoUrl: null,
          createdAt: new Date().toISOString(),
        };
        return setDoc(userDocRef, userDocument).then(() => {
          this.storeSession(user);
          return user;
        });
      });

    return from(promise);
  }

  login(email: string, password: string) {
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
      photoUrl: user.photoURL,
      phoneNumber: user.phoneNumber,
    };
    localStorage.setItem('user', JSON.stringify(sessionData));
  }

  getSession() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    const promise = this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });

    return from(promise);
  }

  updateUser(updatedUser: any) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return new Observable((observer) => {
        observer.error('User not authenticated');
      });
    }

    const updatePromises: Promise<any>[] = [];

    if (updatedUser.username !== user.displayName) {
      updatePromises.push(
        updateProfile(user, { displayName: updatedUser.username })
      );
    }

    if (updatedUser.email !== user.email) {
      updatePromises.push(updateEmail(user, updatedUser.email));
    }

    if (updatedUser.password) {
      updatePromises.push(updatePassword(user, updatedUser.password));
    }

    return from(Promise.all(updatePromises)).pipe(
      switchMap(() => {
        return from(user.reload()).pipe(
          switchMap(() => {
            this.storeSession(user);
            return [user];
          })
        );
      })
    );
  }
}
