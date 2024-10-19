import { DatabaseModule, IRepository } from '@dealer365-backend/database';
import { MessageBrokerModule } from '@dealer365-backend/message-broker';
import { CRM_SERVICE_OPTIONS, ILeadService } from '@dealer365-backend/shared';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PackageCrmModuleOptions } from '../package-crm-options.interface';
import { Lead, LeadSchema } from './entities';
import { LeadAsyncService, LeadSyncService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomLeadRepository } from './services/custom-lead.repository';

@Module({})
export class LeadServiceModule {
  static forRoot(options: PackageCrmModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: CRM_SERVICE_OPTIONS,
        useValue: options,
      },
      {
        provide: ILeadService,
        useClass: options?.useBroker ? LeadAsyncService : LeadSyncService,
      },
    ];

    return {
      module: LeadServiceModule,
      imports: [
        DatabaseModule.forRoot({
          type: options.databaseOptions.type,
          url: options.databaseOptions.url,
          models: [
            { name: Lead.name, schema: LeadSchema },
          ]
        }),
        ...(options.useBroker ? [MessageBrokerModule.forRoot(options.brokerOptions)] : []),
        MongooseModule.forFeature([{ name: 'Lead', schema: LeadSchema }]),  // Mongoose 모델 재사용
      ],
      providers: [...providers,
        {
          provide: 'LeadRepository',  // 기존 'LeadRepository' 토큰 오버라이드
          useClass: CustomLeadRepository,
        },
        {
          provide: IRepository,  // IRepository는 오버라이드된 'LeadRepository'를 사용
          useExisting: 'LeadRepository',
        },
      ],
      exports: [ILeadService],
    };
  }
}