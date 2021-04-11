import mongoose from 'mongoose';

class Service {
  model: any;

  constructor(model: any) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(query: any) {
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id);
      } catch (errors: any) {
        return {
          errors,
          error: true,
          statusCode: 500,
        };
      }
    }

    try {
      let items = await this.model
        .find(query)
        .skip(skip)
        .limit(limit);
      let total = await this.model.count();

      return {
        total,
        error: false,
        statusCode: 200,
        data: items,
      };
    } catch (errors) {
      return {
        errors,
        error: true,
        statusCode: 500,
      };
    }
  }

  async insert(data: any) {
    try {
      let item = await this.model.create(data);
      if (item)
        return {
          item,
          error: false,
        };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Not able to create item",
        errors: error.errors
      };
    }
  }

  async update(id: String, data: any) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        item,
        error: false,
        statusCode: 202,
      };
    } catch (errors: any) {
      return {
        errors,
        error: true,
        statusCode: 500,
      };
    }
  }

  async delete(id: String) {
    try {
      let item = await this.model.findByIdAndDelete(id);
      if (!item)
        return {
          error: true,
          message: "item not found",
          statusCode: 404,
        };

      return {
        item,
        error: false,
        deleted: true,
        statusCode: 202,
      };
    } catch (errors) {
      return {
        errors,
        error: true,
        statusCode: 500,
      };
    }
  }
}

export default Service;
