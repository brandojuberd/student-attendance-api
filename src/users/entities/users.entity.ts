import { ArgsType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
@ArgsType()
@ObjectType()
export class User {
  @Field(() => ID)
  _id!: Types.ObjectId;

  @Field(() => String)
  @Prop({type: String})
  username!: string

  @Field(() => String)
  @Prop({type: String})
  role!: string

  @Field(() => String)
  @Prop({type: String})
  password!: string
}

export const UserSchema = SchemaFactory.createForClass(User);
