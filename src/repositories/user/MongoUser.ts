import {
  ObjectId,
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
  async updatePresentation(id: ObjectId, num: number): Promise<UpdateWriteOpResult> {
    return this.collection.updateOne({ _id: id }, { remainPresentation: num });
  }
  async updatePoint(id: ObjectId, point: number): Promise<UpdateWriteOpResult> {
    return this.collection.updateOne({ _id: id }, { point });
  }
  async delete(id: ObjectId): Promise<DeleteWriteOpResultObject> {
    return this.collection.deleteOne({ _id: id });
  }
  async findByUserId(id: ObjectId): Promise<User> {
    return this.collection.findOne({ _id: id });
  }
  async findUsers(): Promise<User[]> {
    return this.collection.find().toArray();
  }
}
