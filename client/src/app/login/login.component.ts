import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { localStorageKeys, messageStatus, routes } from '../util/constants';
import { FirebaseService } from '../services/firebase.service';

const { error } = messageStatus;

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
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem(localStorageKeys.user)) {
      this.router.navigate([routes.pokemons]);
    }
  }

  async onSignIn(email: string, password: string) {
    try {
      const res = await this.firebaseService.signIn(email, password);
      if (res) {
        localStorage.setItem(localStorageKeys.user, JSON.stringify(res.user));
        this.router.navigate([routes.pokemons]);
      }
    } catch (e) {
      this.toastrService.show('Failed to sign in', 'Error', { status: error });
    }
  }
}
