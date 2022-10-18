import { ArgsType, InputType, PartialType } from '@nestjs/graphql';
import { CreateClassroomInput } from './create-classroom.input';
// ${1 : PascalCase}

@ArgsType()
@InputType()
export class UpdateClassroomInput extends PartialType(
  CreateClassroomInput,
  InputType,
) {}
