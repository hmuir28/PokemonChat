import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';

import { buttonText, localStorageKeys, messageStatus } from '../../../../util/constants';
import { PokemonService } from '../../../../services/pokemon.service';
import PokemonDetails from '../../../../models/pokemon-details';
import UserPokemon from '../../../../models/user-pokemon';

const { update, submit } = buttonText;
const { success, error } = messageStatus;

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss'],
})
export class ShowItemComponent implements OnChanges, OnDestroy, OnInit {
  @Input()
  isPokemonListCustom?: boolean;

  @Input()
  pokemon: PokemonDetails | null = {
    abilities: [],
    description: '',
    displayName: '',
    logoUrl: '',
    moreDetailUrl: '',
    name: '',
    sprites: {},
  };

  btnText: string = 'Submit';
  modalClose: () => void = () => ({});
  selectedPokemon: PokemonDetails = {
    abilities: [],
    description: '',
    displayName: '',
    logoUrl: '',
    moreDetailUrl: '',
    name: '',
    sprites: {},
  };

  selectedSprite?: string;
  spritesKeys: string[] = [];
  pokemonDetailSubscription?: Subscription;
  
  constructor(
    private pokemonService: PokemonService,
    private toastrService: NbToastrService,
  ) {
  }

  ngOnInit() {
    this.loadBtnText();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const change in changes) {
      if (changes.hasOwnProperty(change) && changes[change].currentValue) {
        switch(change) {
          case 'pokemon':

            if (!this.pokemon) {
              return;
            }

            const { name } = this.pokemon;

            if (!this.isPokemonListCustom) {
              const { moreDetailUrl } = this.pokemon;
              this.pokemonDetailSubscription = this.pokemonService
                .getPokemon(moreDetailUrl)
                .subscribe(({ abilities, sprites }) => {
                  this.selectedPokemon = {
                    abilities,
                    name,
                    sprites,
                    moreDetailUrl,
                  } as PokemonDetails;
                  this.spritesKeys = Object.keys(this.selectedPokemon.sprites);
                });
            } else {
              this.selectedPokemon = {
                ...this.pokemon,
              };
            }

            break;

          case 'isPokemonListCustom':
            this.loadBtnText();
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

  handleSubmit() {
    const userInfo = localStorage.getItem(localStorageKeys.user);

    if (userInfo && this.selectedSprite && this.selectedPokemon) {
      const { uid } = JSON.parse(userInfo);
      const clonedPokemon = cloneDeep(this.selectedPokemon);

      clonedPokemon.sprites = { logoUrl: this.selectedPokemon.sprites[this.selectedSprite] };
      const userPokemon: UserPokemon = {
        uid,
        pokemonDetails: clonedPokemon,
      };

      this.pokemonService.createPokemon(userPokemon)
        .toPromise()
        .then(() => {
          this.toastrService.show('Pokemon submitted!', 'Successful', { status: success });
          this.modalClose();
        })
        .catch(() => {
          this.toastrService.show('Pokemon cannot be submitted!', 'Fail', { status: error });
        });
    } else {
      // TODO: Replace this toastr with form validation errors below each corresponding field.
      this.toastrService.show('Please select a sprite for your pokemon.', 'Fail', { status: error });
    }
  }

  listenerModalCloseEvent({ modalClose }: any) {
    this.modalClose = modalClose;
  }

  loadBtnText() {
    if (!this.isPokemonListCustom) {
      this.btnText = submit;
    } else {
      this.btnText = update;
    }
  }

  selectPokemonSprite(spriteKey: string) {
    this.selectedSprite = spriteKey;
  }
}
