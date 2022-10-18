import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { School } from '../entities/school.entity';

// ${1 : PascalCase}
// ${2 : camelCase}
// This used for return collection/model object with count field
// 
// Example implementation check PaymentLoansListObject
@ObjectType()
export class SchoolsList {
  @Field(() => [School])
  schools!: School[];

  @Field()
  count!: number;
}
