
import Controller from  './controller';
import PokemonService from  "../services/pokemon-service";
import Pokemon from  "../models/pokemon";

const pokemonService = new PokemonService(
  new Pokemon().getInstance(),
);

class PokemonController extends Controller {
  constructor(service: PokemonService) {
    super(service);
  }
}

export default new PokemonController(pokemonService);
