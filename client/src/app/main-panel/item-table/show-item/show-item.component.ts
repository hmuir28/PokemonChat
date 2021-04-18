import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';

import { localStorageKeys, messageStatus } from '../../../util/constants';
import { PokemonService } from '../../../services/pokemon.service';
import CustomPokemon from 'src/app/models/custom-pokemon';
import Pokemon from '../../../models/pokemon';
import PokemonDetails from '../../../models/pokemon-details';
import UserPokemon from '../../../models/user-pokemon';

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
  pokemon?: Pokemon & CustomPokemon;

  modalClose: () => void = () => ({});
  selectedSprite?: string;
  spritesKeys: string[] = [];
  pokemonDetails?: PokemonDetails;
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
      const { url } = this.pokemon;
      this.pokemonDetailSubscription = this.pokemonService.getPokemon(url)
        .subscribe(({ abilities, sprites }) => {
          this.pokemonDetails = new PokemonDetails(abilities, '', '', name, sprites, url);
          this.spritesKeys = Object.keys(this.pokemonDetails.sprites);
        });
    } else {
      const {
        abilities,
        displayName,
        description,
        logoUrl,
        moreDetailUrl,
      } = this.pokemon;

      const sprite = { logoUrl };
      this.pokemonDetails = new PokemonDetails(abilities, displayName, description, name, sprite, moreDetailUrl);
      this.spritesKeys = Object.keys(this.pokemonDetails.sprites);
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
