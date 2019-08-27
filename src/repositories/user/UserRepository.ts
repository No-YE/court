import { InsertOneWriteOpResult, DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb';
import { User } from '../../entities';

export interface UserRepository {
  create(user: User): Promise<InsertOneWriteOpResult>;
  updatePresentation(id: string, num: number): Promise<UpdateWriteOpResult>;
  updatePoint(id: string, point: number): Promise<UpdateWriteOpResult>;
  delete(id: string): Promise<DeleteWriteOpResultObject>;
  findByUserId(id: string): Promise<User>;
  findUsers(offset: number, limit: number): Promise<User[]>;
}
