import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { JobCrmModule } from './job-crm.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(JobCrmModule);
  Logger.debug('Nest application started');
}

bootstrap();