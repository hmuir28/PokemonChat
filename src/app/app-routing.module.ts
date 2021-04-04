import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { LoginComponent } from './login/login.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { SignupComponent } from './signup/signup.component';

import { routes } from './config/constants';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(routes.login);

const angularRoutes: Routes = [
  {
    path: routes.login,
    component: LoginComponent,
  },
  {
    ...canActivate(redirectUnauthorizedToLogin),
    path: routes.pokemons,
    component: MainPanelComponent,
  },
  {
    path: routes.signup,
    component: SignupComponent,
  },
  {
    path: '',
    redirectTo: `/${routes.login}`,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(angularRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
