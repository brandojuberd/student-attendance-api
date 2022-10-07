// import { ArgsType, InputType, Field, ObjectType } from '@nestjs/graphql';
// import { WhatsappTemplateMessageCategoryEnum } from '../entities/whatsapp-template-message-category.enum';
// import { WhatsappTemplateMessageLanguageEnum } from '../entities/whatsapp-template-message-language.enum';
// import { WhatsappTemplateMessageStatusEnum } from '../entities/whatsapp-template-message-status.enum';
// @InputType()
// @ArgsType()
// @ObjectType()
// export class GetWhatsappTemplateMessagesArgs  {
// 	@Field(() => String, { nullable: true })
// 	name!: string;
// 	@Field(() => WhatsappTemplateMessageStatusEnum, { nullable: true })
// 	status: WhatsappTemplateMessageStatusEnum;
// 	@Field(() => WhatsappTemplateMessageCategoryEnum, { nullable: true })
// 	category: WhatsappTemplateMessageCategoryEnum;
// 	@Field(() => WhatsappTemplateMessageLanguageEnum, { nullable: true })
// 	language: WhatsappTemplateMessageLanguageEnum;
// 	@Field({ nullable: true, description: "Id get from qontak" })
// 	whatsAppTemplateMessageID!: string;
// }
