import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server';
import { MockResolver } from './resolvers';

const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [
    MockResolver,
  ],
});

export default new ApolloServer({
  schema,
  playground: true,
});
