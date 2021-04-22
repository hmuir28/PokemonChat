import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { routes } from '../util/constants';
import { MainPanelComponent } from './main-panel/main-panel.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(routes.login);

const routesConfig: Routes = [
  {
    ...canActivate(redirectUnauthorizedToLogin),
    path: routes.pokemons,
    component: MainPanelComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routesConfig)],
  exports: [RouterModule],
})
export class PokemonsRoutingModule {};