import { ArgsType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
@ArgsType()
@ObjectType()
export class Student {
  @Field(() => ID)
  _id!: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String })
  nisn!: string;

  @Field(() => String)
  @Prop({ type: String })
  fullName!: string;

  @Field(() => String)
  @Prop({ type: String })
  profilePhoto!: string;

  @Field(() => String)
  @Prop({ type: String })
  school!: string;

  @Field(() => String)
  @Prop({ type: String })
  class!: string;

  @Field(() => Date)
  @Prop({ type: Date })
  birthDate!: Date;

  @Field(() => String)
  @Prop({ type: String })
  countryCode!: string;

  @Field(() => String)
  @Prop({ type: String })
  phone!: string;

  // @Field(() => StudentAttendance, { nullable: true })
  // @Prop({ type: StudentAttendanceSchema })
  // attendance?: StudentAttendance;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
