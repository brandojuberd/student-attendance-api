import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';

// ${1 : PascalCase}
// This used for query
// DO NOT FORGET TO DELETE 'extends PaginationArgs' if it is not used
@ArgsType()
@InputType()
export class GetUsersArgs {
  @Field({ nullable: true })
  _id!: string;
}
