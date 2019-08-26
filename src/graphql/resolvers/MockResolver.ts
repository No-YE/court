import { Resolver, Query } from 'type-graphql';

@Resolver()
export class MockResolver {
  @Query(() => Number)
  public number() {
    return 0;
  }
}
