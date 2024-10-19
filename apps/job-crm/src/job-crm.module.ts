import { DatabaseModule, IRepository, LEAD_REPOSITORY } from '@dealer365-backend/database';
import { MessageBrokerModule } from '@dealer365-backend/message-broker';
import { Lead, LeadSchema, SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomLeadRepository } from './custom-lead.repository';
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
  //MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),  // Mongoose 모델 등록
  ],
  controllers: [],
  providers: [JobCrmService,
    // {
    //   provide: LEAD_REPOSITORY,  // 기존 LeadRepository 토큰 오버라이드
    //   useClass: CustomLeadRepository,
    // },
    // {
    //   provide: IRepository,  // IRepository는 오버라이드된 LeadRepository를 사용
    //   useExisting: LEAD_REPOSITORY,
    // },
  ],
})
export class JobCrmModule { }
