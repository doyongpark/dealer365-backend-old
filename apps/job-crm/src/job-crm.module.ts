import { CustomLoggerModule } from '@dealer365-backend/custom-logger';
import { DatabaseModule } from '@dealer365-backend/database';
import { MessageBrokerModule } from '@dealer365-backend/message-broker';
import { Lead, LeadSchema } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LeadJobService } from './jobs/lead.job.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.crm'],
    }),
    CustomLoggerModule.forRoot({
      provider: process.env.LOGGER_PROVIDER || 'nest',
      level: process.env.LOGGER_LEVEL || 'debug',
      format: process.env.LOGGER_FORMAT || 'json',
      logType: process.env.LOGGER_TYPE || 'console',
    }),
    DatabaseModule.forRoot({
      type: process.env.DATABASE_TYPE,
      url: process.env.DATABASE_URL,
      models: [
        { name: Lead.name, schema: LeadSchema },
      ]
    }),
    MessageBrokerModule.forRoot({
      type: process.env.MESSAGE_BROKER_TYPE,
      url: process.env.MESSAGE_BROKER_SERVICE_CONNECTION_STRING,
      queueName: process.env.MESSAGE_BROKER_QUEUE_NAME,
      useListener: process.env.USE_MESSAGE_BROKER_LISTENER === 'true',
      maxRetries: parseInt(process.env.MESSAGE_BROKER_MAX_RETRIES || '10'),
      retryInterval: parseInt(process.env.MESSAGE_BROKER_RETRY_INTERVAL || '10000'),
    }),
  ],
  controllers: [],
  providers: [LeadJobService],
})
export class JobCrmModule { }
