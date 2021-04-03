import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokemonService } from '../../../services/pokemon';
import Pokemon from '../../../models/pokemon';
import PokemonDetails from 'src/app/models/pokemon-details';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnChanges, OnDestroy {

  @Input()
  pokemon!: Pokemon;

  spritesKeys: string[] = [];
  pokemonDetails!: PokemonDetails;
  pokemonDetailSubscription!: Subscription;
  
  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'pokemon': {
            if (this.pokemon) {
              this.pokemonDetailSubscription = this.pokemonService.getPokemon(this.pokemon.url)
                .subscribe(({ abilities, sprites }) => {
                  if (!this.pokemonDetails) {
                    this.pokemonDetails = new PokemonDetails(abilities, sprites);
                  } else {
                    this.pokemonDetails.abilities = abilities;
                    this.pokemonDetails.sprites = sprites;
                  }

                  console.log(this.pokemonDetails);

                  this.spritesKeys = Object.keys(this.pokemonDetails.sprites);
                });
            }
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.pokemonDetailSubscription.unsubscribe();
  }

  isPropString(obj: any) {
    return typeof obj === 'string';
  }

}
