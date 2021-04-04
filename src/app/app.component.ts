import { Component } from '@angular/core';
import { localStorageKeys } from './config/constants';

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
}
