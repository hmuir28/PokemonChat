import Pokemon from "./pokemon";

interface Ability {
  ability: { name: string };
}

interface Sprite {
  [key: string]: string | undefined;
}

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
