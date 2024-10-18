import { DatabaseModule } from '@dealer365-backend/database';
import { MessageBrokerModule } from '@dealer365-backend/message-broker';
import { LeadSchema } from '@dealer365-backend/package-crm';
import { SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobCrmService } from './job-crm.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.crm'],
  }),
  SharedModule.forRoot({
    loggerOptions: {
      provider: process.env.LOGGER_PROVIDER || 'nest',
      level: process.env.LOGGER_LEVEL || 'debug',
      format: process.env.LOGGER_FORMAT || 'json',
      logType: process.env.LOGGER_TYPE || 'console',
    },
  }),
  DatabaseModule.forRoot({
    type: process.env.DATABASE_TYPE,
    url: process.env.DATABASE_URL,
    models: [
      { name: 'Lead', schema: LeadSchema },
    ]
  }),
  MessageBrokerModule.forRoot({
    type: process.env.MESSAGE_BROKER_TYPE,
    url: process.env.MESSAGE_BROKER_SERVICE_CONNECTION_STRING,
    useListener: process.env.MESSAGE_BROKER_USE_LISTENER === 'true',
    queueName: process.env.MESSAGE_BROKER_QUEUE_NAME,
  })],
  controllers: [],
  providers: [JobCrmService],
})
export class JobCrmModule { }
