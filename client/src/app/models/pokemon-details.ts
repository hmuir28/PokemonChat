import Ability from './ability';
import Sprite from './sprite';
import Pokemon from "./pokemon";

export default interface PokemonDetails extends Pokemon {
  _id: string;
  abilities: Array<Ability>;
  displayName: string;
  description: string;
  logoUrl: string;
  sprites: Sprite;
}
