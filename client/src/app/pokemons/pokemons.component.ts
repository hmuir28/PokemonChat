import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import Pokemon from '../models/pokemon';
import PokemonDetails from '../models/pokemon-details';
import { ModalService } from './item-table/modal/modal.service';
import { IPokemonsResponse, PokemonService } from '../services/pokemon.service';

import { localStorageKeys, pokemonTabs, routes } from '../util/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  isPokemonListCustom: boolean = false;
  pokemons: Pokemon[] = [];
  pokemon$?: Observable<PokemonDetails>;

  constructor(
    private modalService: ModalService,
    private pokemonService: PokemonService,
    private router: Router,
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
    return this.pokemonService
      .getUserPokemons(uid)
      .then(({ response }) => this.pokemons = response.items);
  }

  handleOfficialPokemonsList() {
    return this.pokemonService
      .getPokemons()
      .then(({ results: pokemons }: IPokemonsResponse) => this.pokemons = pokemons);
  }

  joinChatRoom() {
    this.router.navigate([routes.exchangePokemonsRoom]);
  }

  pokemonSelectionListener(pokemon: PokemonDetails) {
    this.pokemon$ = of(pokemon);
    this.modalService.open('item-modal');
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
