import PokemonDetails from './pokemon-details';

export default class UserPokemon {
  uid: string;
  pokemonDetails: PokemonDetails;

  constructor(
    uid: string,
    pokemonDetails: PokemonDetails,
  ) {
    this.uid = uid;
    this.pokemonDetails = pokemonDetails;
  }
}
