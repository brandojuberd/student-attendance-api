import { ArgsType, Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { WhatsappTemplateMessageBodyArgs, WhatsappTemplateMessageBodyInput } from '../dto/whatsapp-template-message-body.dto';
import { WhatsappTemplateMessageButtonArgs, WhatsappTemplateMessageParameterButtonInput } from './whatsapp-template-message-button.input';

@ArgsType()
@InputType()
export class WhatsappTemplateMessageParameterArgs {

	@Field(() => [WhatsappTemplateMessageBodyArgs])
	body!: WhatsappTemplateMessageBodyArgs[];

	@Field(() => [WhatsappTemplateMessageButtonArgs], { nullable: true })
	buttons?: WhatsappTemplateMessageButtonArgs[];

}

@ArgsType()
@InputType()
export class WhatsappTemplateMessageParameterInput {

	@Field(() => [WhatsappTemplateMessageBodyInput])
	body!: WhatsappTemplateMessageBodyInput[];

	@Field(() => [WhatsappTemplateMessageParameterButtonInput], { nullable: true })
	buttons?: WhatsappTemplateMessageParameterButtonInput[];

}