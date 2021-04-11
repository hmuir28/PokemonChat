export const mongoConfiguration = {
  connectionConfig: {
    db: 'pokemon-chat',
    hostname: '0.0.0.0',
    port: 27017,
    via: 'mongodb://',
  },
  useNewUrlParser: 'useNewUrlParser',
  useFindAndModify: 'useFindAndModify',
  useCreateIndex: 'useCreateIndex',
  useUnifiedTopology: 'useUnifiedTopology',
};

export const pokemonSchema = 'pokemons';
