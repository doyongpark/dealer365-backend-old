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
      provider: process.env.LOGGER_PROVIDER,
      loggerOptions: {
        level: process.env.LOGGER_LEVEL,
        format: process.env.LOGGER_FORMAT,
        logType: process.env.LOGGER_TYPE,
      }
    }),
    DatabaseModule.forRoot({
      type: process.env.DATABASE_TYPE,
      connectionString: process.env.DATABASE_CONNECTION_STRING,
      useLogging: process.env.USE_DATABASE_LOGGING === 'true',
      models: [
        { name: Lead.name, schema: LeadSchema },
      ]
    }),
    MessageBrokerModule.forRoot({
      messageBrokerType: process.env.MESSAGE_BROKER_TYPE,
      messageBrokerOptions: {
        connectionString: process.env.MESSAGE_BROKER_CONNECTION_STRING,
        queueName: process.env.MESSAGE_BROKER_QUEUE_NAME,
        useListener: process.env.USE_MESSAGE_BROKER_LISTENER === 'true',
        connectionMaxRetry: parseInt(process.env.MESSAGE_BROKER_CONNECTION_MAX_RETRIES),
        connectionRetryInterval: parseInt(process.env.MESSAGE_BROKER_CONNECTION_RETRY_INTERVAL),
      }
    })
  ],
  controllers: [],
  providers: [LeadJobService],
})
export class JobCrmModule { }
