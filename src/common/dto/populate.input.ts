import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { Document, ObjectId as TypeObjectId } from 'mongoose';
// ${1 : PascalCase}

@InputType()
export class QueryOptionInput {
  @Field({ nullable: true })
  lean?: boolean;
}

@InputType()
@ArgsType()
export class PopulateInput {
  @Field()
  path!: string;

  @Field(() => [PopulateInput], { nullable: true })
  populate?: PopulateInput[];

  @Field(() => QueryOptionInput, { nullable: true })
  options?: QueryOptionInput;
}
