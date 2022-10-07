import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateStudentAttendanceInput } from './create-student-attendance.input';
// ${1 : PascalCase}

@ArgsType()
@InputType()
export class UpdateStudentAttendanceInput {
  @Field(() => Date)
  checkIn!: Date;
}
