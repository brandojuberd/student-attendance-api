import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { Document, ObjectId as TypeObjectId } from 'mongoose';
// ${1 : PascalCase}

@InputType()
@ArgsType()
export class CreateStudentInput {
  @Field(() => ID)
  _id!: TypeObjectId;
}