export const mongoConfiguration = {
  connectionConfig: {
    db: 'pokemon-chat',
    hostname: 'mongodb',
    port: 27017,
    via: 'mongodb://',
  },
  useNewUrlParser: 'useNewUrlParser',
  useFindAndModify: 'useFindAndModify',
  useCreateIndex: 'useCreateIndex',
  useUnifiedTopology: 'useUnifiedTopology',
};

export const pokemonSchema = 'pokemons';
