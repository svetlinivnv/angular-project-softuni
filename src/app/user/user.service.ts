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
import { UserDocument } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  hasUser: boolean = false;

  firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  // Register user
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

  // Login user
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

  // Store user session in localstorage
  storeSession(user: User) {
    const sessionData = {
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      photoUrl: user.photoURL,
      phoneNumber: user.phoneNumber,
    };
    localStorage.setItem('user', JSON.stringify(sessionData));
    console.log(user);
  }

  // Get user from localstorage
  getSession() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  // Logout user
  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });

    return from(promise);
  }

  updateUser(updatedUser: any): Observable<any> {
    const auth = getAuth();
    const user = auth.currentUser;

    console.log(updatedUser);

    if (!user) {
      return new Observable((observer) => {
        observer.error('User not authenticated');
      });
    }

    const updatePromises: Promise<any>[] = [];

    // Update username (displayName)
    if (updatedUser.username !== user.displayName) {
      updatePromises.push(
        updateProfile(user, { displayName: updatedUser.username })
      );
    }

    // Update email
    if (updatedUser.email !== user.email) {
      updatePromises.push(updateEmail(user, updatedUser.email));
    }

    // Update password if new password is provided
    if (updatedUser.password) {
      updatePromises.push(updatePassword(user, updatedUser.password));
    }

    // Execute all updates
    return from(Promise.all(updatePromises)).pipe(
      switchMap(() => {
        return from(user.reload()).pipe(
          switchMap(() => {
            this.storeSession(user); // Update session after reload
            return [user]; // Return updated user
          })
        );
      })
    );
  }
}
