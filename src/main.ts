import { NestFactory } from '@nestjs/core';
import { fstat, readFileSync } from 'fs';
import { AppModule } from './app.module';
import { checkEnvVariable } from './common/helpers/check-env-variable.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      cert: readFileSync("./cert.pem", "utf-8"),
      key: readFileSync("./.key", "utf-8"),
    }
  });
  await app.listen(checkEnvVariable('SERVER_PORT'));
}
bootstrap();
