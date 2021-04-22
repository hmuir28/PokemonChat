import PokemonDetails from "./pokemon-details";

export default interface Message {

  pokemon?: PokemonDetails;
  // TODO: Create a model for users
  user: any;
};
