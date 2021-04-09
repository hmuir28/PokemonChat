import PokemonDetails from "./pokemon-details";

export default class Message {

  pokemon?: PokemonDetails;
  // TODO: Create a model for users
  user: any;

  constructor(pokemon: PokemonDetails, user: any) {
    this.pokemon = pokemon;
    this.user = user;
  }
};
