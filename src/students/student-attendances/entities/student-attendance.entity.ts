import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, TypeObjectId } from 'src/common/helpers/mongoose.helper';
import { Student } from 'src/students/entities/student.entity';

// Delete this guide before push ====
// ${1 : PascalCase} ex: OpenRequest
// ${2 : camelCase}  ex: openRequest
// Used for field with value object inside of model/collection
// Example implementation on User.membership field that have class UserMembership as its value
// ===================================

@Schema()
@ArgsType()
@ObjectType()
export class StudentAttendance {
  // Relation
  @Field(() => Student)
  @Prop({ type: ObjectId, ref: Student.name })
  student!: TypeObjectId;

  @Field(() => Date)
  @Prop({ type: Date })
  checkIn!: Date;

  @Field(() => Date)
  @Prop({ type: Date })
  checkOut?: Date | undefined;
}

@InputType()
export class UpsertStudentAttendanceInput {
  //   @Field({ nullable: true })
  //   longitude: number;
}

// Usually used for query
// Rarely used
@InputType()
export class ReadStudentAttendanceInput {
  //   @Field({ nullable: true })
  //   longitude: number;
}

export const StudentAttendanceSchema =
  SchemaFactory.createForClass(StudentAttendance);
