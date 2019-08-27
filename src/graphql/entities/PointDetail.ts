import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
export class PointDetail {
  @Field()
  userId: ObjectId;

  @Field()
  point: number;

  @Field()
  reason: string;

  @Field()
  createdAt: Date;
}
