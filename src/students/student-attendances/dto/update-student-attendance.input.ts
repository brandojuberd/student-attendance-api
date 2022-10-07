import { ArgsType, InputType, PartialType } from '@nestjs/graphql';
import { CreateStudentAttendanceInput } from './create-student-attendance.input';
// ${1 : PascalCase}

@ArgsType()
@InputType()
export class UpdateStudentAttendanceInput extends PartialType(
  CreateStudentAttendanceInput, InputType
) {}
