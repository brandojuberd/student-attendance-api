import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args.';

// ${1 : PascalCase}
// This used for query
// DO NOT FORGET TO DELETE 'extends PaginationArgs' if it is not used
@ArgsType()
@InputType()
export class GetSchoolsArgs extends PaginationArgs {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  logoPhoto?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true, description: 'Area code ex: Jakarta is 21' })
  areaCode?: string;

  @Field({ nullable: true, description: 'phone without area code' })
  phone?: string;
}
