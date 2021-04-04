import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NB_WINDOW_CONTEXT } from '@nebular/theme';
import { Subscription } from 'rxjs';

import { PokemonService } from '../../../services/pokemon';
import Pokemon from '../../../models/pokemon';
import PokemonDetails from 'src/app/models/pokemon-details';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss']
})
export class ShowItemComponent implements OnInit, OnDestroy {
  // TODO: pokemon type is any due to the implemented hack in <item-table.component.ts>
  pokemon: any;

  spritesKeys: string[] = [];
  pokemonDetails!: PokemonDetails;
  pokemonDetailSubscription!: Subscription;
  
  constructor(
    private pokemonService: PokemonService,
  ) {}

  ngOnInit(): void {
    this.pokemonDetailSubscription = this.pokemonService.getPokemon(this.pokemon.url)
      .subscribe(({ abilities, sprites }) => {
        if (!this.pokemonDetails) {
          this.pokemonDetails = new PokemonDetails(abilities, sprites);
        } else {
          this.pokemonDetails.abilities = abilities;
          this.pokemonDetails.sprites = sprites;
        }

        this.spritesKeys = Object.keys(this.pokemonDetails.sprites);
      });
  }

  ngOnDestroy() {
    this.pokemonDetailSubscription.unsubscribe();
  }

  isPropString(obj: any) {
    return typeof obj === 'string';
  }

}
