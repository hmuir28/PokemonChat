import { Component, OnInit } from '@angular/core';
import Pokemon from '../models/pokemon';
import { IPokemonsResponse, PokemonService } from '../services/pokemon.service';

import { localStorageKeys, pokemonTabs } from '../util/constants';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  isPokemonListCustom: boolean = false;
  pokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
  }

  handleCustomPokemonsList() {
    const userInfo = localStorage.getItem(localStorageKeys.user);

    if (!userInfo) {
      // @todo add exception handler to log this kind of errors.
      throw new Error('Fatal Error...');
    }

    const { uid } = JSON.parse(userInfo);
    return this.pokemonService.getUserPokemons(uid)
      .then(({ response }) => this.pokemons = response.items);
  }

  handleOfficialPokemonsList() {
    return this.pokemonService.getPokemons()
      .then(({ results: pokemons }: IPokemonsResponse) => this.pokemons = pokemons);
  }

  selectTab({ tabTitle }: any): void {
    if (tabTitle === pokemonTabs.customPokemons) {
      this.isPokemonListCustom = true;
      this.handleCustomPokemonsList();
    } else if (tabTitle === pokemonTabs.officialPokemons) {
      this.isPokemonListCustom = false;
      this.handleOfficialPokemonsList();
    }
  }
}
