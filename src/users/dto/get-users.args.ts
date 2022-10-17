import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { UserRoleEnum } from '../entities/user-role.enum';

// ${1 : PascalCase}
// This used for query
// DO NOT FORGET TO DELETE 'extends PaginationArgs' if it is not used
@ArgsType()
@InputType()
export class GetUsersArgs {
  @Field(() => String, {nullable: true})
  email?: string;

  @Field(() => String, {nullable: true})
  username?: string;

  @Field(() => [UserRoleEnum], {nullable: true})
  role?: UserRoleEnum[];

  @Field(() => String, {nullable: true})
  password?: string;
}
