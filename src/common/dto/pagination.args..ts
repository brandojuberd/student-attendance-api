import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@ArgsType()
@InputType()
export class PaginationArgs {
  @Field(() => Int, {
    nullable: true,
    description: `
    implements pagination, <page> default value is 1
    works with field <limit> to skip (<page>*<limit>) docs.
  `,
  })
  page?: number;

  @Field(() => Int, {
    nullable: true, 
    description: `
    implements pagination, <limit> default value is 10
    works with field <page> to skip (<page>*<limit>) docs.
  `,
  })
  limit?: number;

  @Field(() => String, {
    nullable: true,
    description: `
    Can sort multiple <key>
    format: <key>:<sort>|<key2>:<sort>|<nextKey>:<sort>
    <sort> is either : 1 (ascending) or -1 (descending)
    | is used as separator between key
    example: createdAt:-1|title:1
  `,
  })
  sort?: string;

  @Field(() => SearchOptionsInput, {
    nullable: true,
  })
  searchOptions?: SearchOptionsInput;
}

@ArgsType()
@InputType()
export class SearchOptionsInput {
  // @Field(() => String, { nullable: true })
  // fieldContains: string;
  // @Field(() => [String], { nullable: true })
  // searchInField: string[];
  @Field()
  searchText!: string;

  @Field(() => [String])
  searchInFields!: string[]

  // @Field({ nullable: true, description: 'default: false' })
  // caseSensitive: boolean;

  // @Field({ nullable: true, description: `
  //   Handles diacritic case, for example: é, ê, and e.
  //   mongo default value: false
  // `})
  // diacriticSensitive: boolean;
}
