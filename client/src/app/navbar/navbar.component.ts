import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    :host nb-layout-header ::ng-deep nav {
      justify-content: flex-end;
    }
  `],
})
export class NavbarComponent implements OnInit, OnDestroy {

  items = [{ title: 'Sign out' }];
  itemsSubscription!: Subscription;

  constructor(
    private firebaseFirebase: FirebaseService,
    private nbMenuService: NbMenuService,
    private router: Router,
    private ws: WebSocketService,
  ) {}

  ngOnInit(): void {
    this.itemsSubscription = this.nbMenuService.onItemClick()
      .pipe(map(({ item: { title } }) => title))
      .subscribe(title => {
        switch (title) {
          case 'Sign out':
            this.handleLogout();
            break;
        }
      });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.ws.close();
  }

  handleLogout() {
    this.firebaseFirebase.logOut()
      .then(() => this.router.navigate(['login']));
  }
}
