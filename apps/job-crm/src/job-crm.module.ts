import { CustomLoggerModule } from '@dealer365-backend/custom-logger';
import { DatabaseModule } from '@dealer365-backend/database';
import { MessageBrokerModule } from '@dealer365-backend/message-broker';
import { Lead, LEAD_REPOSITORY, LeadSchema } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { LeadJobService } from './jobs/lead.job.service';
import { OverridedLeadRepository } from './repositories/overrided-lead.repository';

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
    }),
    MongooseModule.forFeature([
      { name: Lead.name, schema: LeadSchema }
    ]),// 재 정의 할 Repository Document 가져오기
  ],
  controllers: [],
  providers: [LeadJobService,
    {
      provide: LEAD_REPOSITORY, // 재 정의 할 Repository Token
      useFactory: (model) => new OverridedLeadRepository(model), // 재 정의 할 Repository 생성
      inject: [getModelToken(Lead.name)], // Mongoose 모델 인젝션
    }
  ],
})
export class JobCrmModule { }
