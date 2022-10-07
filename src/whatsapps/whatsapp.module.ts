import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsappTemplateMessageSchema } from './entities/whatsapp-template-message.entity';
import { WhatsappTemplateMessagesService } from './whatsapp-templates.service';
import { WhatsappsService } from './whatsapps.service';

// ${1 : PascalCase}
// ${2 : lowercase}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'WhatsappTemplateMessage', schema: WhatsappTemplateMessageSchema }]),
  ],
  providers: [WhatsappsService, WhatsappTemplateMessagesService],
  exports: [WhatsappsService]
})
export class WhatsappsModule {}