import { NestFactory } from '@nestjs/core';
import { ApiSaleModule } from './api-sale.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiSaleModule);
  await app.listen(3000);
}
bootstrap();
