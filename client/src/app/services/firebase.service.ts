import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { localStorageKeys } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebaseAuth: AngularFireAuth) {}

  signIn(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.firebaseAuth.signOut()
      .then(() => localStorage.removeItem(localStorageKeys.user));
  }
}
