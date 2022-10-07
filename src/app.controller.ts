import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WhatsappsService } from './whatsapps/whatsapps.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly whatsappsService: WhatsappsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('whatapps/template')
  getTemplate() {
    return this.whatsappsService.getTemplate({
      query: ""
    })
  }

  @Post('whatapps/send')
  sendMessage() {
    return this.whatsappsService.sendAnyMessage()
  }
}
