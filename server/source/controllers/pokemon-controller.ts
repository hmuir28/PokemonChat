
import { Request, Response } from 'express';

import Controller from  './controller';
import PokemonService from  "../services/pokemon-service";
import Pokemon from  "../models/pokemon";

const pokemonService = new PokemonService(
  new Pokemon().getInstance(),
);

class PokemonController extends Controller {
  constructor(service: PokemonService) {
    super(service);
    this.getUserPokemons = this.getUserPokemons.bind(this);
    this.updatePokemon = this.updatePokemon.bind(this);
  }

  async getUserPokemons(req: Request, res: Response) {
    return res.status(200).send(await pokemonService.getUserPokemons(req.params));
  }

  async updatePokemon(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(500);
    }

    const updatedPokemon = await this.update(req, res); 
    return updatedPokemon;
  }
}

export default new PokemonController(pokemonService);
