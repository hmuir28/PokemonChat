import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokemonService } from '../../../services/pokemon.service';
import Pokemon from '../../../models/pokemon';
import PokemonDetails from 'src/app/models/pokemon-details';
import { WebSocketService } from 'src/app/services/websocket.service';
import Message from 'src/app/models/message';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss']
})
export class ShowItemComponent implements OnChanges, OnDestroy {
  @Input()
  pokemon!: Pokemon;

  spritesKeys: string[] = [];
  pokemonDetails!: PokemonDetails;
  pokemonDetailSubscription!: Subscription;
  
  constructor(
    private pokemonService: PokemonService,
    private ws: WebSocketService,
    ) {}

  ngOnInit(): void {
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    for (const change in simpleChanges) {
      if (simpleChanges.hasOwnProperty(change) && simpleChanges[change].currentValue) {
        switch(change) {
          case 'pokemon':
            this.pokemonDetailSubscription = this.pokemonService.getPokemon(this.pokemon.url)
              .subscribe(({ abilities, sprites }) => {
                const { name, url } = this.pokemon;
                const {
                  displayName,
                  description,
                } = this.pokemonDetails;

                this.pokemonDetails = new PokemonDetails(
                  abilities,
                  displayName,
                  description,
                  name,
                  sprites,
                  url
                );

                this.spritesKeys = Object.keys(this.pokemonDetails.sprites);
              });
            break;
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.pokemonDetailSubscription) {
      this.pokemonDetailSubscription.unsubscribe();
    }
  }

  isPropString(obj: any) {
    return typeof obj === 'string';
  }

  sendPokemon() {
    const message = new Message(this.pokemonDetails, 'hmuir');
  }
}
