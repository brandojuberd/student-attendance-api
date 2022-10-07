import { ArgsType, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
// ${1 : PascalCase}

@ArgsType()
@InputType()
export class UpdateUserInput extends PartialType(
  CreateUserInput, InputType
) {}
