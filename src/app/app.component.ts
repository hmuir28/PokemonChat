import { Component } from '@angular/core';
import { localStorageKeys, routes } from './config/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chat';

  isLoggedIn() {
    return localStorage.getItem(localStorageKeys.user);
  }

  showPokemonLogo() {
    return window.location.pathname.indexOf(routes.login) !== -1 ||
      window.location.pathname.indexOf(routes.signup) !== -1;
  }
}
