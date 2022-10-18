import { ArgsType, InputType, PartialType } from '@nestjs/graphql';
import { CreateSchoolInput } from './create-school.input';
// ${1 : PascalCase}

@ArgsType()
@InputType()
export class UpdateSchoolInput extends PartialType(
  CreateSchoolInput,
  InputType,
) {}
