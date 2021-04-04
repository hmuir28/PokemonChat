import { Component, OnInit } from '@angular/core';
import { localStorageKeys } from '../config/constants';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignedIn: boolean = false;
  
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    if (localStorage.getItem(localStorageKeys.user)) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  async onSignIn(email: string, password: string) {
    try {
      await this.firebaseService.signIn(email, password);
      if (this.firebaseService.isLoggedIn) {
        this.isSignedIn = true;
      }
    } catch {}
  }
}
