import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { Document, ObjectId as TypeObjectId } from 'mongoose';
import { UserRoleEnum } from '../entities/user-role.enum';
// ${1 : PascalCase}

@InputType()
@ArgsType()
export class CreateUserInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  username!: string;

  @Field(() => UserRoleEnum)
  role!: UserRoleEnum;

  @Field(() => String)
  password!: string;
}
