import { NestFactory } from '@nestjs/core';
import { ApiCrmModule } from './api-crm.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiCrmModule);
  await app.listen(3000);
}
bootstrap();
