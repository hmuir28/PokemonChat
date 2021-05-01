import Service from "./create-service";
import HttpResponse from '../models/http-response';

class PokemonService extends Service {
  constructor(model: any) {
    super(model);
    this.getUserPokemons = this.getUserPokemons.bind(this);
  }

  async getUserPokemons(query: any) {
    const httpResponse = new HttpResponse();

    try {
      const items = await this.model.find({ uid: query.uid });
      console.log(items);
      httpResponse.statusCode = 200;
      httpResponse.response = { items };

      return httpResponse;
    } catch (errors) {
      httpResponse.errors = errors;
      httpResponse.statusCode = 500;

      return httpResponse;
    }
  }
}

export default PokemonService;
