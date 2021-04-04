import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageKeys, routes } from '../config/constants';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignedIn: boolean = false;
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem(localStorageKeys.user)) {
      this.router.navigate([routes.pokemons]);
    }
  }

  async onSignIn(email: string, password: string) {
    try {
      await this.firebaseService.signIn(email, password);
      if (this.firebaseService.isLoggedIn) {
        this.router.navigate([routes.pokemons]);
      }
    } catch {}
  }
}
