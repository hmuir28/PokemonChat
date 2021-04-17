// Pokemon API
export const pokemonBaseUrl = 'https://pokeapi.co/api/v2';
export const pokemonsUrl = pokemonBaseUrl + '/pokemon?limit=1118'

// Backend API
/**
 * @todo Add a proxy to handle endpoints from different APIs
 * Besides refactor the name of the variable that holds the url.
 */
export const defaultBaseUrl = 'http://localhost:3000';
export const serverUrl = defaultBaseUrl + '/pokemons';
