import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@InputType()
export class DateRangeArgs {
  @Field({ nullable: true })
  start?: Date;

  @Field({ nullable: true })
  end?: Date;
}
