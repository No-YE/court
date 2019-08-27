import { InsertOneWriteOpResult, ObjectId, DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb';
import { User } from '../../entities';

export interface UserRepository {
  create(user: User): Promise<InsertOneWriteOpResult>;
  updatePresentation(id: ObjectId, num: number): Promise<UpdateWriteOpResult>;
  updatePoint(id: ObjectId, point: number): Promise<UpdateWriteOpResult>;
  delete(id: ObjectId): Promise<DeleteWriteOpResultObject>;
  findByUserId(id: ObjectId): Promise<User>;
  findUsers(offset: number, limit: number): Promise<User[]>;
}
