import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server';

const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [],
});

export default new ApolloServer({
  schema,
});
