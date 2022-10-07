import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/users.entity';

// ${1 : PascalCase}
// ${2 : camelCase}
// This used for return collection/model object with count field
// 
// Example implementation check PaymentLoansListObject
@ObjectType()
export class UsersList {
  @Field(() => [User])
  users!: User[];

  @Field()
  count!: number;
}
