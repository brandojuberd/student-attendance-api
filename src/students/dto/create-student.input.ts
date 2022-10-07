import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { Document, ObjectId as TypeObjectId } from 'mongoose';
// ${1 : PascalCase}

@InputType()
@ArgsType()
export class CreateStudentInput {
  @Field(() => String)
  nik!: string;

  @Field(() => String)
  fullName!: string;

  @Field(() => String)
  profilePhoto!: string;

  @Field(() => String)
  school!: string;

  @Field(() => String)
  class!: string;

  @Field(() => Date)
  birthDate!: Date;

  @Field(() => String)
  countryCode!: string;

  @Field(() => String)
  phone!: string;
}
