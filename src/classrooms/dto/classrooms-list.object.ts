import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { Classroom } from '../entities/classroom.entity';

// ${1 : PascalCase}
// ${2 : camelCase}
// This used for return collection/model object with count field
//
// Example implementation check PaymentLoansListObject
@ObjectType()
export class ClassroomsList {
  @Field(() => [Classroom])
  classrooms!: Classroom[];

  @Field()
  count!: number;
}
