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
    _id: '',
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
    _id: '',
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
      if (changes.hasOwnProperty(change)) {
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
                    _id: '',
                  } as PokemonDetails;
                  this.spritesKeys = Object.keys(this.selectedPokemon.sprites);
                });
            } else {
              this.pokemonService
                .getUserPokemon(this.pokemon._id)
                .then(({ response }) => {
                  const { item } = response;
                  this.selectedPokemon = {
                    ...item,
                  };
                });
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

  handleToastrPokemon(msg: string, title: string, status: { [key: string]: string }, modalClose: Function = () => {}) {
    this.toastrService.show(msg, title, status);
    modalClose();
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
        .then(() => this.handleToastrPokemon('The pokemon was submitted!', 'Successful', { status: success }, this.modalClose))
        .catch(() => this.handleToastrPokemon('The pokemon cannot be submitted!', 'Fail', { status: error }));
    } else {
      // TODO: Replace this toastr with form validation errors below each corresponding field.
      this.toastrService.show('Please select a sprite for your pokemon.', 'Fail', { status: error });
    }
  }

  handleUpdate() {
    const userInfo = localStorage.getItem(localStorageKeys.user);

    // TODO: Implement feature to update sprites
    if (userInfo && this.selectedPokemon) {
      const { uid } = JSON.parse(userInfo);
      const clonedPokemon = cloneDeep(this.selectedPokemon);

      const userPokemon: UserPokemon = {
        uid,
        pokemonDetails: clonedPokemon,
      };

      this.pokemonService.updatePokemon(clonedPokemon._id, userPokemon)
        .toPromise()
        .then(() => this.handleToastrPokemon('The pokemon was updated!', 'Successful', { status: success }, this.modalClose))
        .catch(() => this.handleToastrPokemon('The pokemon cannot be updated!', 'Fail', { status: error }));
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

  triggerPokemonCrudHandler() {
    if (this.isPokemonListCustom) {
      this.handleUpdate();
    } else {
      this.handleSubmit();
    }
  }
}
