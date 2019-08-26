import { connect, MongoClientOptions, Db } from 'mongodb';
import { mongoUri } from '../config';

export const connectDb = async(): Promise<Db> => {
  const options: MongoClientOptions = {
    useNewUrlParser: true,
  };

  const connection = await connect(mongoUri, options);

  return connection.db();
};
