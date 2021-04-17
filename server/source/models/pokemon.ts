import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { pokemonSchema } from '../util/constants';

class Pokemon {

  initSchema() {
    const schema = new Schema({
      abilities: Array,
      displayName: String,
      description: String,
      logoUrl: String,
      moreDetailUrl: String,
      name: String,
      uid: String,
    }, {
      timestamps: true,
    });

    schema.plugin(uniqueValidator);
    mongoose.model(pokemonSchema, schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model(pokemonSchema);
  }
}

export default Pokemon;
