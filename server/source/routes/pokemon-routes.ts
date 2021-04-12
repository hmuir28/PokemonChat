import { Router } from 'express';

import PokemonController from '../controllers/pokemon-controller';

const router = Router();

router.get('/:id', PokemonController.get);
router.get('/', PokemonController.getAll);
router.post('/', PokemonController.insert);
router.put('/:id', PokemonController.update);
router.delete('/:id', PokemonController.delete);

export = router;
