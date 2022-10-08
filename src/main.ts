import { NestFactory } from '@nestjs/core';
import { fstat, readFileSync } from 'fs';
import { AppModule } from './app.module';
import { checkEnvVariable } from './common/helpers/check-env-variable.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
    // preflightContinue: true
  });
  await app.listen(checkEnvVariable('SERVER_PORT'));
}
bootstrap();
