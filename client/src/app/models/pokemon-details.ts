import Pokemon from "./pokemon";

interface Ability {
  ability: { name: string };
}

interface Sprite {
  [key: string]: string | undefined;
}

export default class PokemonDetails extends Pokemon {
  abilities: Array<Ability>;
  sprites: Sprite;

  constructor(abilities: Array<Ability>, name: string, sprites: Sprite, url: string) {
    super(name, url);
    this.abilities = abilities;
    this.sprites = sprites;
  }
}
