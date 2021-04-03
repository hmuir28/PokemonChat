interface Ability {
  ability: { name: string };
}

interface Sprite {
  [key: string]: string | undefined;
}

export default class PokemonDetails {
  abilities: Array<Ability>;
  sprites: Sprite;

  constructor(abilities: Array<Ability>, sprites: Sprite) {
    this.abilities = abilities;
    this.sprites = sprites;
  }
}
