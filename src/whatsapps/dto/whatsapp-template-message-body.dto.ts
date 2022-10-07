import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';

@ArgsType()
@InputType()
export class WhatsappTemplateMessageBodyArgs {

	@Field({ description: "must be number with type of string" })
	key!: string;

	@Field({ description: "must be in snake case, max length 16" })
	value!: string;

	@Field({description: "the text that will be show in whatsapp message"})
	value_text!: string;
}

@ArgsType()
@InputType()
export class WhatsappTemplateMessageBodyInput {

	@Field({ description: "must be number with type of string" })
	key!: string;

	@Field({ description: "must be in snake case, max length 16" })
	value!: string;

}
