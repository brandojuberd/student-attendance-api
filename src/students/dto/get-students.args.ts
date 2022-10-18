import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.args.';

// ${1 : PascalCase}
// This used for query
// DO NOT FORGET TO DELETE 'extends PaginationArgs' if it is not used
@ArgsType()
@InputType()
export class GetStudentsArgs extends PaginationArgs{
  @Field(() => String, { nullable: true })
  nik?: string;

  @Field(() => String, { nullable: true })
  fullName?: string;

  @Field(() => String, { nullable: true })
  profilePhoto?: string;

  @Field(() => String, { nullable: true })
  school?: string;

  @Field(() => String, { nullable: true })
  class?: string;

  @Field(() => Date, { nullable: true })
  birthDate?: Date;

  @Field(() => String, { nullable: true })
  countryCode?: string;

  @Field(() => String, { nullable: true })
  phone?: string;
}
