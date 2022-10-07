import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { Student } from '../entities/student.entity';

// ${1 : PascalCase}
// ${2 : camelCase}
// This used for return collection/model object with count field
// 
// Example implementation check PaymentLoansListObject
@ObjectType()
export class StudentsList {
  @Field(() => [Student])
  students!: Student[];

  @Field()
  count!: number;
}
