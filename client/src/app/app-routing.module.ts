import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { routes } from './util/constants';

const angularRoutes: Routes = [
  {
    path: routes.login,
    component: LoginComponent,
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
