import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class PointDetail {
  @Field()
  userId: string;

  @Field()
  point: number;

  @Field()
  reason: string;

  @Field()
  createdAt: Date;
}
