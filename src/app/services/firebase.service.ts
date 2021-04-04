import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { localStorageKeys } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn: boolean = false;

  constructor(private firebaseAuth: AngularFireAuth) {}

  async signIn(email: string, password: string) {
    try {
      const res = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      this.isLoggedIn = true;
      localStorage.setItem(localStorageKeys.user, JSON.stringify(res.user));
    } catch {}
  }

  async signUp(email: string, password: string) {
    try {
      const res = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
      this.isLoggedIn = true;
      localStorage.setItem(localStorageKeys.user, JSON.stringify(res.user));
    } catch {}
  }

  logOut() {
    return this.firebaseAuth.signOut()
      .then(() => localStorage.removeItem(localStorageKeys.user));
  }
}
