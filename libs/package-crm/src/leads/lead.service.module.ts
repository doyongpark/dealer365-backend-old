import { DatabaseModule } from '@dealer365-backend/database';
import { MessageBrokerModule } from '@dealer365-backend/message-broker';
import { CRM_SERVICE_OPTION, Lead, LeadSchema } from '@dealer365-backend/shared';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PackageCrmModuleOptions } from '../package-crm-options.interface';
import { LeadAsyncService, LeadSyncService } from './services';
import { ILeadService } from './services/lead.service.interface';

@Module({})
export class LeadServiceModule {
  static forRoot(options: PackageCrmModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: CRM_SERVICE_OPTION,
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
      ],
      providers: [...providers],
      exports: [ILeadService],
    };
  }
}