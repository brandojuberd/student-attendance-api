import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  checkEnvVariable,
  requiredEnvVariable,
} from './common/helpers/check-env-variable.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
    // preflightContinue: true
  });
  requiredEnvVariable([
    'QONTAK_CHAT_SERVICE_BASE_URL',
    'QONTAK_CHANNEL_INTEGRATION_ID',
    'QONTAK_CLIENT_SECRET',
    'QONTAK_CLIENT_ID',
    'QONTAK_USERNAME',
    'WHATSAPP_PHONE_NUMBER',
    'WHATSAPP_TEMPLATE_MESSAGE_ID',
  ]);
  await app.listen(checkEnvVariable('SERVER_PORT'));
}
bootstrap();
