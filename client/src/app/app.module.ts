import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDialogModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
  NbToastrModule,
  NbTreeGridModule,
  NbThemeModule,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { PokemonsModule } from './pokemons/pokemons.module';

// Custom Angular Files
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';

// Custom Configuration Files
import FirebaseConfig from './config/firebase-config';

// Custom Interceptor Files
import { CommonInterceptor } from './interceptors/common-interceptor';
import { ExchangePokemonsComponent } from './exchange-pokemons/exchange-pokemons.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ExchangePokemonsComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbButtonModule,
    NbCardModule,
    NbContextMenuModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbTabsetModule,
    NbToastrModule.forRoot({ position: NbGlobalPhysicalPosition.TOP_RIGHT }),
    NbTreeGridModule,
    NbEvaIconsModule,
    PokemonsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
