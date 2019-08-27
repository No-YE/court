import { PointRepository } from './PointRepository';
import { PointDetail } from '../../entities';
import { InsertOneWriteOpResult, Collection, Db } from 'mongodb';

export default class MongoPointRepository implements PointRepository {
  private readonly collection: Collection;

  constructor(db: Db) {
    this.collection = db.collection('points');
  }

  async createPoint(point: PointDetail): Promise<InsertOneWriteOpResult> {
    return await this.collection.insertOne(point);
  }
  async findPoints(offset: number, limit: number): Promise<PointDetail[]> {
    return await this.collection.find().skip(offset).limit(limit).toArray();
  }
}
