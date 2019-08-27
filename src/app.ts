import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server';
import { MockResolver, UserResolver } from './resolvers';
import { verifyToken, authChecker, Context } from './util';

const schema: GraphQLSchema = buildSchemaSync({
  authChecker,
  resolvers: [
    MockResolver,
    UserResolver,
  ],
});

export default new ApolloServer({
  schema,
  playground: true,
  context({ req }) {
    const token = <string>req.headers.token;
    const ctx: Context = {
      user: verifyToken(token),
    };

    return ctx;
  },
});
