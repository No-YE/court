import { Resolver, Query, Mutation, Authorized, Arg, Ctx } from 'type-graphql';
import { User } from '../entities';
import UserRepository from '../repositories/user';
import { Context } from '../util';

@Resolver()
export class UserResolver {
  
}
