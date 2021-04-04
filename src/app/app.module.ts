import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Custom Angular Files
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { ItemTableComponent } from './main-panel/item-table/item-table.component';

import FirebaseConfig from './config/firebase-config';

// Additional Node Modules
import { AngularFireModule } from '@angular/fire';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbTreeGridModule,
  NbThemeModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ItemCardComponent } from './main-panel/item-table/item-card/item-card.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    ItemTableComponent,
    ItemCardComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
    NbTreeGridModule,
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
