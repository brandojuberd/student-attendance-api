import { ArgsType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId as TypeObjectId } from 'mongoose';

@ArgsType()
@ObjectType()
export class WhatsappTemplateMessageBody{
	@Field({ description: "must be number with type of string" })
	@Prop()
	key!: string;

	@Field({description: "must be in snake case, max length 16"})
	@Prop()
	value!: string;

}
