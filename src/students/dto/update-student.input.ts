import { ArgsType, InputType, PartialType } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
// ${1 : PascalCase}

@ArgsType()
@InputType()
export class UpdateStudentInput extends PartialType(
  CreateStudentInput, InputType
) {}
