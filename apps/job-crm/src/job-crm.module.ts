import { CustomLoggerModule } from '@dealer365-backend/custom-logger';
import { DatabaseModule } from '@dealer365-backend/database';
import { MessageBrokerModule } from '@dealer365-backend/message-broker';
import { Lead, LEAD_REPOSITORY, LeadSchema } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { LeadCreateJobService, LeadDeleteJobService, LeadJobService, LeadUpdateJobService } from './jobs';
import { OverridedLeadRepository } from './repositories/overrided-lead.repository';
import { Connection } from 'mongoose';
import { TransactionalCrmRepository } from './repositories/transactional-crm.repository';
import { IntegratedCrmRepository } from './repositories/integrated-crm.repository';

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
        { name: 'Lead2', schema: LeadSchema }
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
      { name: Lead.name, schema: LeadSchema },
      { name: 'Lead2', schema: LeadSchema }
    ]),// 재 정의 할 Repository Document 가져오기
  ],
  controllers: [],
  providers: [
    LeadJobService,
    //LeadCreateJobService, LeadUpdateJobService, LeadDeleteJobService, 
    //processMessage 함수를 가진 Job Service를 여러번 인젝션하면 마지막 함수것만 실행됨. processmessage 함수를 하나로 합쳐서 사용해야함.

    //재 정의 할 Repository 생성
    {
      provide: LEAD_REPOSITORY,
      useFactory: (model) => new OverridedLeadRepository(model),
      inject: [getModelToken(Lead.name)],
    },
    //트랜잭션을 관리 할 Repository 생성
    {
      provide: TransactionalCrmRepository,
      useFactory: (model1, model2, conn) => new TransactionalCrmRepository(model1, model2, conn),
      inject: [getModelToken(Lead.name), getModelToken('Lead2'), 'CONNECTION'],
    },
    //다수의 Repository를 사용하는 경우
    {
      provide: IntegratedCrmRepository,
      useFactory: (repo1, repo2) => new IntegratedCrmRepository(repo1, repo2),
      inject: [LEAD_REPOSITORY, 'LEAD2_REPOSITORY'],
    }
  ],
})
export class JobCrmModule { }
