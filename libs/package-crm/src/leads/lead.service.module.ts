import { DatabaseModule } from '@dealer365-backend/database';
import { MessageBrokerModule } from '@dealer365-backend/message-broker';
import { CRM_SERVICE_OPTIONS } from '@dealer365-backend/shared';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PackageCrmModuleOptions } from '../package-crm-config.interface';
import { LeadSchema } from './entities';
import { LeadAsyncService, LeadSyncService } from './services';
import { ILeadService } from './services/lead.service.interface';

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
            { name: 'Lead', schema: LeadSchema },
            { name: 'Lead2', schema: LeadSchema },
          ]
        }),
        ...(options.useBroker ? [MessageBrokerModule.forRoot({ ...options.brokerOptions, queueName: 'crm-queue' })] : []),
      ],
      providers: providers,
      exports: [ILeadService],
    };
  }
}