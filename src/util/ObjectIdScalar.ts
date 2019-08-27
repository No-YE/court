import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb';

// tslint:disable-next-line: variable-name
export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  parseValue(value: string) {
    return new ObjectId(value);
  },
  serialize(value: ObjectId) {
    return value.toHexString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value);
    }
    return null;
  },
});
