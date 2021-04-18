import Ability from './interfaces/ability';
import Sprite from './interfaces/sprite';
import Pokemon from "./pokemon";

export default class PokemonDetails extends Pokemon {
  abilities: Array<Ability>;
  displayName: string;
  description: string;
  sprites: Sprite;

  constructor(
    abilities: Array<Ability>,
    displayName: string,
    description: string,
    name: string,
    sprites: Sprite,
    url: string,
  ) {
    super(name, url);
    this.abilities = abilities;
    this.displayName = displayName;
    this.description = description;
    this.sprites = sprites;
  }
}
