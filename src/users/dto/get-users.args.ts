import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args.';
import { UserRoleEnum } from '../entities/user-role.enum';

// ${1 : PascalCase}
// This used for query
// DO NOT FORGET TO DELETE 'extends PaginationArgs' if it is not used
@ArgsType()
@InputType()
export class GetUsersArgs extends PaginationArgs {
  @Field(() => String, {nullable: true})
  email?: string;

  @Field(() => String, {nullable: true})
  username?: string;

  @Field(() => [UserRoleEnum], {nullable: true})
  role?: UserRoleEnum[];

  @Field(() => String, {nullable: true})
  password?: string;
}
