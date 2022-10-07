import { ArgsType, Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId as TypeObjectId } from 'mongoose';
import { WhatsappTemplateMessageComponent } from './whatsapp-template-message-button.entity';
import { WhatsappTemplateMessageCategoryEnum } from './whatsapp-template-message-category.enum';
import { WhatsappTemplateMessageLanguageEnum } from './whatsapp-template-message-language.enum';
import { WhatsappTemplateMessageParameter } from './whatsapp-template-message-parameter.entity';
import { WhatsappTemplateMessageStatusEnum } from './whatsapp-template-message-status.enum';

@Schema({ timestamps: true })
@ArgsType()
@ObjectType()
export class WhatsappTemplateMessage {
  @Field(() => ID)
  _id!: TypeObjectId;

  @Field(() => String)
  @Prop()
  name!: string;

  @Field(() => WhatsappTemplateMessageStatusEnum)
  @Prop({ type: String, default: WhatsappTemplateMessageStatusEnum.Pending })
  status!: WhatsappTemplateMessageStatusEnum;

  @Field(() => WhatsappTemplateMessageCategoryEnum)
  @Prop({ type: String })
  category!: WhatsappTemplateMessageCategoryEnum;

  @Field(() => WhatsappTemplateMessageLanguageEnum)
  @Prop({ type: String })
  language!: string;

  // @Field(() => String, { nullable: true })
  // @Prop()
  // header?: string;

  @Field(() => String)
  @Prop()
  bodyText!: string;

  @Field(() => [String], { nullable: true })
  @Prop()
  exampleBodyText?: string[];

  @Field(() => WhatsappTemplateMessageParameter)
  @Prop()
  parameters!: WhatsappTemplateMessageParameter;

  @Field(() => String, { nullable: true })
  @Prop()
  footer!: string;

  @Field(() => String, { nullable: true, description: 'Id get from qontak' })
  @Prop({ type: String })
  whatsAppTemplateMessageID?: string | undefined;

  @Field(() => [WhatsappTemplateMessageComponent])
  @Prop()
  buttons!: WhatsappTemplateMessageComponent[];
}

export const WhatsappTemplateMessageSchema = SchemaFactory.createForClass(
  WhatsappTemplateMessage,
);
// WhatsappSchema.index({ email: 1 });
