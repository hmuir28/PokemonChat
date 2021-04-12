import mongoose from 'mongoose';
import { mongoConfiguration } from '../util/constants';

const { connectionConfig } = mongoConfiguration;

const mongoUri = `${connectionConfig.via}${connectionConfig.hostname}:${connectionConfig.port}/${connectionConfig.db}`;

class MongoConfig {
  constructor() {
    const url =
      process.env.MONGODB_URI || mongoUri;

    mongoose.Promise = global.Promise;
    mongoose.set(mongoConfiguration.useCreateIndex, true);
    mongoose.set(mongoConfiguration.useFindAndModify, false);
    mongoose.set(mongoConfiguration.useNewUrlParser, true);
    mongoose.set(mongoConfiguration.useUnifiedTopology, true);
    mongoose.connect(url);
  }
}

export default new MongoConfig();
