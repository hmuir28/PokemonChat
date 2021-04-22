import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';

import { localStorageKeys, messageStatus } from '../../../../util/constants';
import { PokemonService } from '../../../../services/pokemon.service';
import Pokemon from '../../../../models/pokemon';
import PokemonDetails from '../../../../models/pokemon-details';
import UserPokemon from '../../../../models/user-pokemon';

const { success, error } = messageStatus;

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss'],
})
export class ShowItemComponent implements OnInit, OnDestroy {
  @Input()
  isPokemonListCustom?: boolean;

  @Input()
  pokemon?: Pokemon & PokemonDetails;

  modalClose: () => void = () => ({});
  selectedPokemon: PokemonDetails = {};
  selectedSprite?: string;
  spritesKeys: string[] = [];
  pokemonDetailSubscription?: Subscription;
  
  constructor(
    private pokemonService: PokemonService,
    private toastrService: NbToastrService,
  ) {
  }

  ngOnInit() {
    if (!this.pokemon) return;

    const { name } = this.pokemon;

    if (!this.isPokemonListCustom) {
      const { moreDetailUrl } = this.pokemon;
      this.pokemonDetailSubscription = this.pokemonService.getPokemon(moreDetailUrl)
        .subscribe(({ abilities, sprites }) => {
          this.selectedPokemon.abilities = abilities;
          this.selectedPokemon.name = name;
          this.selectedPokemon.sprites = sprites;
          this.selectedPokemon.moreDetailUrl = moreDetailUrl;
          this.spritesKeys = Object.keys(this.selectedPokemon.sprites);
        });
    } else {
      this.selectedPokemon = cloneDeep(this.pokemon);
      this.spritesKeys = Object.keys(this.selectedPokemon.sprites);
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

    if (userInfo && this.selectedSprite && this.pokemonDetails) {
      const { uid } = JSON.parse(userInfo);
      const clonedPokemon = cloneDeep(this.pokemonDetails);

      clonedPokemon.sprites = { logoUrl: this.pokemonDetails.sprites[this.selectedSprite] };
      const userPokemon = new UserPokemon(uid, clonedPokemon);

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

  selectPokemonSprite(spriteKey: string) {
    this.selectedSprite = spriteKey;
  }
}
