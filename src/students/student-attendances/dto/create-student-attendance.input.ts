import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { Document, ObjectId as TypeObjectId } from 'mongoose';
import { ObjectIdScalar } from 'src/common/graphql/scalars/object-id.scalars';
// ${1 : PascalCase}

@InputType()
@ArgsType()
export class CreateStudentAttendanceInput {
  @Field(() => ObjectIdScalar)
  student!: TypeObjectId;

  @Field(() => Date)
  checkIn!: Date;
}