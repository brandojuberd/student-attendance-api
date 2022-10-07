import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkEnvVariable } from './common/helpers/check-env-variable.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(checkEnvVariable('SERVER_PORT'));
}
bootstrap();
