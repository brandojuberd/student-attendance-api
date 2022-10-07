import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
import { StudentAttendance } from '../entities/student-attendance.entity';

// ${1 : PascalCase}
// ${2 : camelCase}
// This used for return collection/model object with count field
// 
// Example implementation check PaymentLoansListObject
@ObjectType()
export class StudentAttendancesList {
  @Field(() => [StudentAttendance])
  studentAttendances!: StudentAttendance[];

  @Field()
  count!: number;
}
