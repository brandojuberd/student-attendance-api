import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from 'src/common/services/base-service.service';
import axios from 'axios';
import { qontakAxios } from 'src/common/qontak.api';
import { QontakListWhatsappTemplateArgs } from 'src/whatsapps/dto/qontak-list-whatsapp-template.args';
import { checkEnvVariable } from 'src/common/helpers/check-env-variable.helper';
import { WhatsappTemplateMessagesService } from './whatsapp-templates.service';
import { WhatsappTemplateMessage } from './entities/whatsapp-template-message.entity';
import { SendDirectMessageArgs } from './dto/whatsapp-send-direct-message.args';
// import { qontakAxios } from '../common/qontak.api';
// import { SolutionProcedureVariant } from './classes/solution-procedure-variants.schema';

// ${1 : PascalCase}
// ${2 : camelCase}
@Injectable()
export class WhatsappsService {
  constructor(
    private readonly whatsappTemplateMessagesService: WhatsappTemplateMessagesService,
  ) {}
  private async qontakAccessToken(): Promise<
    | {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        created_at: number;
      }
    | undefined
  > {
    if (checkEnvVariable('NODE_ENV') === 'test') {
      return;
    }

    if (
      !checkEnvVariable('QONTAK_USERNAME') ||
      !checkEnvVariable('QONTAK_PASSWORD') ||
      !checkEnvVariable('QONTAK_CLIENT_ID') ||
      !checkEnvVariable('QONTAK_CLIENT_SECRET') ||
      !checkEnvVariable('QONTAK_CHANNEL_INTEGRATION_ID') ||
      !checkEnvVariable('QONTAK_CHAT_SERVICE_BASE_URL')
    ) {
      throw new BadRequestException({
        message: 'Missing env(s) qontak',
        status: 400,
      });
    }

    const result = await qontakAxios({
      method: 'POST',
      url: '/oauth/token',
      data: {
        username: checkEnvVariable('QONTAK_USERNAME'),
        password: checkEnvVariable('QONTAK_PASSWORD'),
        grant_type: 'password',
        client_id: checkEnvVariable('QONTAK_CLIENT_ID'),
        client_secret: checkEnvVariable('QONTAK_CLIENT_SECRET'),
      },
    });

    return result.data;
  }

  private convertPhoneNumberFormat(
    countryCode: string,
    phoneNumber: string
  ): string {
    if (!countryCode) {
      countryCode = '62';
    }
    let result;
    let phoneNumberPrefix = phoneNumber?.substring(0, countryCode.length);

    /**
     * Handle example country code: "62":
     * 1. 081175526351 => 6281175526351
     * 2. 6281175526351 => 6281175526351
     * 3. 81175526351 => 6281175526351
     */

    if (phoneNumber?.substring(0, 1) === '0') {
      //delete 0 replace with country code
      result = countryCode + phoneNumber.slice(1);
    } else if (phoneNumberPrefix === countryCode) {
      //use phone number directly if phone number contain country code
      result = phoneNumber;
    } else {
      result = countryCode + phoneNumber;
    }

    return result;
  }

  async getTemplate(args: QontakListWhatsappTemplateArgs) {
    const { access_token } = (await this.qontakAccessToken()) || {};

    args.query = '';
    args.limit = 5;
    args.status = "APPROVED"
    const result: {
      data: {
        status: string;
        data: {
          id: string,
          organization_id: string,
          name: string,
          language: string,
          header: object,
          body: string,
          footer: object,
          buttons: object[],
          status: string,
          category: string
        }[];
      };
    } = await axios({
      method: 'GET',
      baseURL: checkEnvVariable('QONTAK_CHAT_SERVICE_BASE_URL'),
      url: '/api/open/v1/templates/whatsapp',
      params: args,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (result.data.status !== 'success') {
      throw new InternalServerErrorException('Qontak Internal Server Error');
    }
    // console.log(result.data.data);
    // result.data.data.forEach(async (template) => {
    //   template
    //   await this.whatsappTemplateMessagesService.create({
    //     ...template,
    //     whatsAppTemplateMessageID: template.id,
    //     bodyText: template.body
    //   });
    // });

    // const dataDb = await this.whatsappTemplateMessagesService.find({}).lean();
    // console.log(dataDb);

    return result.data.data;
  }

  async sendAnyMessage(){
    const templates = await this.getTemplate({
      limit: 5,
      query: "",
      status: "APPROVED"
    })
    console.log({
      templates
    })
    const result = await this.sendDirectMessage({
      messageTopicName: templates[0].name,
      parameters: {body: [], buttons: []},
      telephoneNumber: "628811128613",
      channelIntegrationID: checkEnvVariable("QONTAK_CHANNEL_INTEGRATION_ID"),
      whatsAppTemplateMessageID: templates[0].id
    })
    console.log({
      result
    })
    return "sucess"
  }

  async sendDirectMessage(
    directMessageDataInput: SendDirectMessageArgs,
    stackTrace = new Error().stack
  ): Promise<
    | string
    | SendDirectMessageArgs
    | { message: string; status: number; data: any; stack: string }
  > {
    const {
      channelIntegrationID = checkEnvVariable("QONTAK_CHANNEL_INTEGRATION_ID"),
      telephoneNumber,
      whatsAppTemplateMessageID,
      messageTopicName,
      parameters,
      countryCode,
      toName,
    } = directMessageDataInput;

    if (checkEnvVariable('NODE_ENV') === 'test') {
      //change telephone number for check testing
      directMessageDataInput.telephoneNumber = this.convertPhoneNumberFormat(
        countryCode || "+62",
        telephoneNumber
      );
      return directMessageDataInput;
    }

    return new Promise(async (resolve, reject) => {
      try {
        if (!whatsAppTemplateMessageID) {
          throw new NotFoundException({
            message: `WhatsAppTemplateMessageID tidak ditemukan untuk topic ${messageTopicName}`,
            status: 404,
          });
        }

        const  { access_token } = await this.qontakAccessToken() || {};


        const result = await qontakAxios({
          method: 'POST',
          url: '/api/open/v1/broadcasts/whatsapp/direct',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          data: {
            to_number: this.convertPhoneNumberFormat(
              countryCode || "+62",
              telephoneNumber
            ),
            to_name: `${toName}_${messageTopicName}`,
            message_template_id: whatsAppTemplateMessageID,
            channel_integration_id: channelIntegrationID,
            language: { code: 'id' },
            parameters,
          },
        });

        // let trimStackTrace = stackTrace.split('\n');
        // trimStackTrace.splice(0, 1);
        // let resultStackTrace = trimStackTrace.join('\n');

        // await this.logWhatsappsService.create({
        //   argument: { directMessageDataInput, result: result.data },
        //   stack: resultStackTrace,
        // });

        resolve(result.data.status);
      } catch (err: any) {
        const errObj = {
          data: err.config?.data,
          message: err.message,
          stack: err.stack,
          status: err.response?.status,
        };
        // await this.logWhatsappsService.create({
        //   argument: {
        //     directMessageDataInput,
        //     ...errObj,
        //   },
        //   stack: stackTrace,
        // });
        resolve(errObj);
      }
    });
  }
}
