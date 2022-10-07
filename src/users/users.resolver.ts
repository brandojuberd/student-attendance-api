import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersList } from './dto/users-list.object';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

// ${1 : PascalCase}
// ${2 : camelCase}

@Resolver(() => User)
export class UsersResolver {
  //${1 : CapitalCase}
  //${2 : camelCase}
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  getUsers(@Args('query', { type: () => GetUsersArgs }) query: GetUsersArgs) {
    return this.usersService.find(query);
  }

  @Query(() => User, { name: 'user' })
  findUserById(
    @Args('userId', { type: () => ObjectIdScalar }) userId: Types.ObjectId,
  ) {
    // findUser(@Args() query: GetUsersArgs) {
    return this.usersService.findById(userId);
  }

  @Query(() => UsersList, { name: 'usersList' })
  getUsersList(
    @Args('query', { type: () => GetUsersArgs }) query: GetUsersArgs,
  ) {
    return this.usersService.getUsersList(query);
  }

  @Mutation(() => User)
  userCreate(
    @Args('data', { type: () => CreateUserInput }) body: CreateUserInput,
  ) {
    return this.usersService.create(body);
  }

  @Mutation(() => User)
  userUpdate(
    @Args('userId', { type: () => ObjectIdScalar }) userId: Types.ObjectId,
    @Args('data', { type: () => UpdateUserInput })
    data: UpdateUserInput, //update use same type
  ) {
    return this.usersService.findByIdAndUpdate(userId, data, {
      new: true,
    });
  }

  @Mutation(() => User)
  userDelete(
    @Args('userId', { type: () => ObjectIdScalar }) userId: Types.ObjectId,
  ) {
    return this.usersService.findByIdAndDelete(userId);
  }
}
