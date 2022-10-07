import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { WhatsappTemplateMessageParameterArgs } from './whatsapp-template-message-parameter.dto';

@ArgsType()
@InputType()
export class SendDirectMessageArgs {
  @Field()
  telephoneNumber!: string;

  @Field({ defaultValue: "62" })
  countryCode?: string = "62";

  @Field()
  whatsAppTemplateMessageID?: string;

  @Field({ nullable: true, description: "If not provided using default channel from BE" })
  channelIntegrationID?: string;

  @Field({ nullable: true, description: "receiver customer name", defaultValue: "" })
  toName?: string = "";

  @Field()
  messageTopicName!: string

  @Field(() => WhatsappTemplateMessageParameterArgs)
  parameters!: WhatsappTemplateMessageParameterArgs
}

