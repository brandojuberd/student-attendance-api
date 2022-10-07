import { ArgsType, Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Document, ObjectId as TypeObjectId } from 'mongoose';
import { WhatsappTemplateMessageBody } from './whatsapp-template-message-body.entity';

@ArgsType()
@ObjectType()
export class WhatsappTemplateMessageParameter extends Document {

	@Field(() => [WhatsappTemplateMessageBody])
	@Prop()
	body!: WhatsappTemplateMessageBody[];
	
}

