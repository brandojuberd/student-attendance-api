// import { InputType, Int, Field, ArgsType } from '@nestjs/graphql';
// import { WhatsappTemplateMessageCategoryEnum } from './enums/whatsapp-template-message-category.enum';
// import { WhatsappTemplateMessageLanguageEnum } from './enums/whatsapp-template-message-language.enum';
// import { WhatsappTemplateMessageParameterInput } from './whatsapp-template-message-parameter.dto';
// import { WhatsappTemplateMessageStatusEnum } from './enums/whatsapp-template-message-status.enum';
// import { WhatsappTemplateMessageButtonInput } from './whatsapp-template-message-button.input';

// @ArgsType()
// @InputType()
// export class CreateWhatsappTemplateMessageInput {

//   @Field(() => String, { description: "Template message name, must be unique in qontak Templates list" })
//   name: string;

//   @Field(() => WhatsappTemplateMessageStatusEnum, { nullable: true })
//   status: WhatsappTemplateMessageStatusEnum;

//   @Field(() => WhatsappTemplateMessageCategoryEnum)
//   category: WhatsappTemplateMessageCategoryEnum;

//   @Field(() => WhatsappTemplateMessageLanguageEnum)
//   language: WhatsappTemplateMessageLanguageEnum;

//   @Field(() => String, { nullable: true })
//   header?: string;

//   @Field({ description: "to increase percentage to be approved and accelerate review time by Qontak input exampleBodyText" })
//   bodyText: string


//   @Field(() => [String], {
//     nullable: true,
//     description: "Type array of string but only accept input array of ONE STRING separated by COMMA. don't ask me why"
//   })
//   exampleBodyText?: string[]

//   @Field(() => String, { nullable: true })
//   footer?: string;

//   @Field(() => WhatsappTemplateMessageParameterInput)
//   parameters: WhatsappTemplateMessageParameterInput

//   @Field(() => [WhatsappTemplateMessageButtonInput], { nullable: true })
//   buttons?: WhatsappTemplateMessageButtonInput[];

// }
