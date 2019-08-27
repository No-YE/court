import {
  Collection,
  Db,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
  DeleteWriteOpResultObject,
} from 'mongodb';
import { UserRepository } from './UserRepository';
import { User } from '../../entities';

export default class MongoUserRepository implements UserRepository {
  private readonly collection: Collection;

  constructor(db: Db) {
    this.collection = db.collection('users');
  }

  async create(user: User): Promise<InsertOneWriteOpResult> {
    return await this.collection.insertOne(user);
  }
  async updatePresentation(id: string, num: number): Promise<UpdateWriteOpResult> {
    return this.collection.updateOne({ id }, { remainPresentation: num });
  }
  async updatePoint(id: string, point: number): Promise<UpdateWriteOpResult> {
    return this.collection.updateOne({ id }, { point });
  }
  async delete(id: string): Promise<DeleteWriteOpResultObject> {
    return this.collection.deleteOne({ id });
  }
  async findByUserId(id: string): Promise<User> {
    return this.collection.findOne({ id });
  }
  async findUsers(offset: number, limit: number): Promise<User[]> {
    return this.collection.find().skip(offset).limit(limit).toArray();
  }
}
