import HttpResponse from '../models/http-response';

// TODO: Refactor return properties align it with <HttpResponse>
class Service {
  model: any;

  constructor(model: any) {
    this.model = model;
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get(query: any): Promise<HttpResponse> {
    const httpResponse = new HttpResponse();

    try {
      const item = await this.model.findById({ _id: query.id });
      httpResponse.statusCode = 200;
      httpResponse.response = { item };

      return httpResponse;
    } catch (errors) {
      httpResponse.errors = errors;
      httpResponse.statusCode = 500;

      return httpResponse;
    }
  }

  async getAll(query: any): Promise<HttpResponse> {
    const httpResponse = new HttpResponse();
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    try {
      const items = await this.model
        .find(query)
        .skip(skip)
        .limit(limit);
      const total = await this.model.count();
      httpResponse.total = total;
      httpResponse.statusCode = 200;
      httpResponse.response = { items };

      return httpResponse;
    } catch (errors) {
      httpResponse.errors = errors;
      httpResponse.statusCode = 500;

      return httpResponse;
    }
  }

  async insert(data: any): Promise<HttpResponse> {
    const httpResponse = new HttpResponse();

    try {
      const { uid, pokemonDetails } = data;

      let item = await this.model.create({
        uid,
        abilities: pokemonDetails.abilities,
        displayName: pokemonDetails.displayName,
        description: pokemonDetails.description,
        logoUrl: pokemonDetails.sprites.logoUrl,
        moreDetailUrl: pokemonDetails.moreDetailUrl,
        name: pokemonDetails.name,
      });

      if (item) {
        httpResponse.response = { item };
        httpResponse.statusCode = 200;

        return httpResponse;
      }

      throw new Error();
    } catch (error) {
      httpResponse.statusCode = 500;
      httpResponse.errors = {
        message: error.errmsg || 'Not able to create item',
      };

      return httpResponse;
    }
  }

  async update(id: String, data: any): Promise<HttpResponse> {
    const httpResponse = new HttpResponse();

    try {
      const { uid, pokemonDetails } = data;
      const item = await this.model
        .findByIdAndUpdate({ _id: id }, {
          $set: {
            uid,
            ...pokemonDetails,
          },
        }, {
          new: true,
        });
      
      httpResponse.response = { item };
      httpResponse.statusCode = 202;

      return httpResponse;
    } catch (errors: any) {
      httpResponse.errors = errors;
      httpResponse.statusCode = 500;

      return httpResponse;
    }
  }

  async delete(id: String): Promise<HttpResponse> {
    const httpResponse = new HttpResponse();

    try {
      const item = await this.model.findByIdAndDelete(id);
      if (!item) {
        httpResponse.errors = {
          message: 'item not found',
          statusCode: 404,
        };

        return httpResponse;
      }

      httpResponse.response = { item };
      httpResponse.statusCode = 202;

      return httpResponse;
    } catch (errors) {
      httpResponse.errors = errors;
      httpResponse.statusCode = 500;

      return httpResponse;
    }
  }
}

export default Service;
