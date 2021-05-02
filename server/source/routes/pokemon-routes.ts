import { Router } from 'express';

import PokemonController from '../controllers/pokemon-controller';

const router = Router();

router.get('/user/:uid/pokemon/:id', PokemonController.get);
router.get('/user/:uid/pokemons', PokemonController.getUserPokemons);
router.get('/', PokemonController.getAll);
router.post('/', PokemonController.insert);
router.put('/user/:uid/pokemon/:id', PokemonController.updatePokemon);
router.delete('user/:uid/pokemon/:id', PokemonController.delete);

export = router;
