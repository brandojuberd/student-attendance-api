import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { StudentAttendance } from '../entities/student-attendance.entity';

// ${1 : PascalCase}
// ${2 : camelCase}
// This used for return collection/model object with count field
//
// Example implementation check PaymentLoansListObject
@ObjectType()
export class StudentCheckInObject {
  @Field(() => StudentAttendance, { nullable: true })
  studentAttendance?: StudentAttendance;

  @Field()
  message!: string;
}
