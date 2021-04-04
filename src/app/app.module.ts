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
  NbContextMenuModule,
  NbDialogModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbTreeGridModule,
  NbThemeModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ShowItemComponent } from './main-panel/item-table/show-item/show-item.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    ItemTableComponent,
    ShowItemComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent
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
    NbContextMenuModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbTreeGridModule,
    NbEvaIconsModule,
    NbWindowModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
