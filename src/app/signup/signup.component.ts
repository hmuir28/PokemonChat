import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../config/constants';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async onSignUp(email: string, password: string) {
    try {
      await this.firebaseService.signUp(email, password);
      if (this.firebaseService.isLoggedIn) {
        this.router.navigate([routes.pokemons]);
      }
    } catch {}
  }
}
