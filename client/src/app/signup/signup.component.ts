import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { routes, messageStatus, localStorageKeys } from '../config/constants';
import { FirebaseService } from '../services/firebase.service';

const { error } = messageStatus;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
  }

  async onSignUp(email: string, password: string) {
    try {
      const res = await this.firebaseService.signUp(email, password);
      if (res) {
        localStorage.setItem(localStorageKeys.user, JSON.stringify(res.user));
        this.router.navigate([routes.pokemons]);
      }
    } catch {
      this.toastrService.show('Failed to sign up', 'Error', { status: error });
    }
  }
}
