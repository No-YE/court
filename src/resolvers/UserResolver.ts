import { Resolver, Query, Mutation, Authorized, Arg, Ctx } from 'type-graphql';
import { User, PointDetail } from '../entities';
import UserRepository from '../repositories/user';
import PointRepository from '../repositories/point';
import { Context, getToken } from '../util';

@Resolver()
export class UserResolver {
  userRepository: UserRepository = new UserRepository();
  pointRepository: PointRepository = new PointRepository();

  @Authorized()
  @Query(() => [User])
  async users(
    @Arg('offset', { defaultValue: 0 }) offset: number,
    @Arg('limit', { defaultValue: 10 }) limit: number,
  ): Promise<User[]> {
    return await this.userRepository.findUsers(offset, limit);
  }

  @Authorized()
  @Query(() => User)
  async user(
    @Arg('id') id: string,
  ): Promise<User> {
    return await this.userRepository.findByUserId(id);
  }

  @Mutation(() => Boolean)
  async signUp(
    @Arg('id') id: string,
    @Arg('name') name: string,
    @Arg('password') password: string,
  ): Promise<boolean> {
    const user: User = {
      id,
      name,
      password,
      isAdmin: false,
      remainPresentation: 0,
      point: 0,
      pointId: [],
    };

    const userResult = await this.userRepository.create(user);
    return userResult.result.ok === 1;
  }

  @Mutation(() => String)
  async signIn(
    @Arg('id') id: string,
    @Arg('password') password: string,
  ): Promise<string> {
    const user = await this.userRepository.findByUserId(id);

    if (password !== user.password) {
      throw new Error(''); // TODO: Error 타입 생성해서 만들기
    }

    return getToken(user);
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async addPoint(
    @Arg('id') id: string,
    @Arg('point') point: number,
    @Arg('reason') reason: string,
  ): Promise<boolean> {
    const pointDetail: PointDetail = {
      point,
      reason,
      userId: id,
      createdAt: new Date(),
    };

    const pointResult = await this.pointRepository.createPoint(pointDetail);
    const userResult = await this.userRepository.updatePoint(id, point, pointResult.ops[0]._id);
    return userResult.result.ok === 1;
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async doPresentation(
    @Arg('id') id: string,
  ): Promise<boolean> {
    const user: User = await this.userRepository.findByUserId(id);
    const { remainPresentation } = user;

    if (remainPresentation <= 0) {
      throw new Error(''); // TODO: Error 타입 생성해서 만들기
    }

    const userResult = await this.userRepository.updatePresentation(id, remainPresentation - 1);
    return userResult.result.ok === 1;
  }
}
