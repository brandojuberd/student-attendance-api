import { ArgsType, Field, ObjectType, InputType, ID, OmitType, PickType } from '@nestjs/graphql';

@ArgsType()
@InputType()
export class WhatsappTemplateMessageButtonInput {

	@Field(() => String)//'URL' / quick_reply
	type!: string;

	@Field(() => String, { description: "to increase percentage to be approved and accelerate review time by Qontak input example" })
	text!: string;

	@Field(() => String, { nullable: true })
	url?: string;

	@Field(() => [String], { nullable: true })
	example?: string[];
}


@ArgsType()
@InputType()
export class WhatsappTemplateMessageParameterButtonInput {

	@Field(() => String, { description: "start from 0" })
	index!: string;

	@Field(() => String, { description: "type : url" })
	type!: string;

}

@ArgsType()
@InputType()
export class WhatsappTemplateMessageButtonArgs {
	@Field(() => String, { description: "start from 0" })
	index!: string;

	@Field(() => String, { description: "type : url" })//'URL' / quick_reply
	type!: string;

	@Field(() => String)
	value!: string;

}

@ArgsType()
@ObjectType()
export class WhatsappTemplateMessageButtonObject {
	@Field(() => String)//'URL' / quick_reply
	type!: string;

	@Field(() => String, { description: "Number / Link" })
	text!: string;

	@Field(() => String, { nullable: true })
	url?: string;

	@Field(() => String, { nullable: true })
	phone_number?: string;

	@Field(() => String, { nullable: true })
	example?: string;

}