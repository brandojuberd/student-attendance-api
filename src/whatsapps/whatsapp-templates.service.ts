import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Service } from "src/common/services/base-service.service";
import { WhatsappTemplateMessage } from "./entities/whatsapp-template-message.entity";

@Injectable()
export class WhatsappTemplateMessagesService extends Service<WhatsappTemplateMessage> {
  constructor(
    @InjectModel('WhatsappTemplateMessage')
    private readonly whatsappTemplateModel: Model<WhatsappTemplateMessage>,
  ) {
    super(whatsappTemplateModel);
  }
}
