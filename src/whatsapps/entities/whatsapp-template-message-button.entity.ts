import { ArgsType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


/**
 * Example from qontak
	 *	"url": "https://lovecare.id/{{1}}",
		"text": "Ke Aplikasi",
		"type": "URL",
		"example": "[\"https://lovecare.id//redirect?redirect_url=lovecaremobile%3A%2F%2Fhome\"]"
	 */

@ArgsType()
@ObjectType()
export class WhatsappTemplateMessageComponent {

	@Field()
	@Prop()
	type!: string;

	@Field()
	@Prop()
	text!: string;

	@Field({ nullable: true })
	@Prop()
	url?: string;

	@Field(() => [String], { nullable: true })
	@Prop({ type: [String] })
	example?: string[];

}
