import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from '../util';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  isAdmin: boolean;

  @Field()
  remainPresentation: number;

  @Field()
  point: number;

  @Field(() => [ObjectIdScalar])
  pointId: ObjectId[];
}
