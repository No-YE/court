import { PointRepository } from './PointRepository';
import { PointDetail } from '../../entities';
import { InsertOneWriteOpResult, Collection } from 'mongodb';
import { DB } from '../connection';

export default class MongoPointRepository implements PointRepository {
  private collection: Collection;

  constructor() {
    DB.getDb()
      .then(db => this.collection = db.collection('users'));
  }

  async createPoint(point: PointDetail): Promise<InsertOneWriteOpResult> {
    return await this.collection.insertOne(point);
  }
  async findPoints(offset: number, limit: number): Promise<PointDetail[]> {
    return await this.collection.find().skip(offset).limit(limit).toArray();
  }
}
