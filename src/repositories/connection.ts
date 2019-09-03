import { connect, Db, MongoClientOptions } from 'mongodb';
import { mongoUri } from '../config';

const options: MongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export class DB {
  static db: Db;

  private constructor() {}

  static async getDb() {
    if (!this.db) {
      this.db = (await connect(mongoUri, options)).db();
    }

    return this.db;
  }
}
