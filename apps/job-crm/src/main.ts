import { NestFactory } from '@nestjs/core';
import { JobCrmModule } from './job-crm.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(JobCrmModule);
}
bootstrap();