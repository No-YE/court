import { InsertOneWriteOpResult } from 'mongodb';
import { PointDetail } from '../../entities';

export interface PointRepository {
  createPoint(point: PointDetail): Promise<InsertOneWriteOpResult>;
  findPoints(offset: number, limit: number): Promise<PointDetail[]>;
}
