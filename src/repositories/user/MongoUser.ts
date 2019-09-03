import {
  ObjectId,
  Collection,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
  DeleteWriteOpResultObject,
} from 'mongodb';
import { UserRepository } from './UserRepository';
import { User } from '../../entities';
import { DB } from '../connection';

export default class MongoUserRepository implements UserRepository {
  private collection: Collection;

  constructor() {
    DB.getDb()
      .then(db => this.collection = db.collection('users'));
  }

  async create(user: User): Promise<InsertOneWriteOpResult> {
    return await this.collection.insertOne(user);
  }
  async updatePresentation(id: string, num: number): Promise<UpdateWriteOpResult> {
    return this.collection.updateOne({ id }, { remainPresentation: num });
  }
  async updatePoint(id: string, point: number, pointId: ObjectId): Promise<UpdateWriteOpResult> {
    return this.collection.updateOne({ id }, {
      point,
      pointId: {
        $push: {
          $each: [pointId],
          $position: 0,
        },
      },
    });
  }
  async delete(id: string): Promise<DeleteWriteOpResultObject> {
    return this.collection.deleteOne({ id });
  }
  async findByUserId(id: string): Promise<User> {
    return this.collection.findOne({ id });
  }
  async findUsers(
    offset: number,
    limit: number,
    pointSkip: number = 0,
    pointLimit: number = 10,
  ): Promise<User[]> {
    return this.collection.find().project({
      pointId: {
        $slice: [pointSkip, pointLimit],
      },
    }).skip(offset).limit(limit).toArray();
  }
}
