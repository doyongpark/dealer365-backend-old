import { DatabaseModule } from '@dealer365-backend/database';
import { MessageBrokerModule } from '@dealer365-backend/message-broker';
import { Lead, LeadSchema } from '@dealer365-backend/shared';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { LeadServiceModuleOptions } from './lead.service.option.interface';
import { LeadAsyncService, LeadSyncService } from './services';
import { ILeadService } from './services/lead.service.interface';

@Module({})
export class LeadServiceModule {
  static forRoot(options: LeadServiceModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: ILeadService,
        useClass: options?.useMessageBrokerForCommand ? LeadAsyncService : LeadSyncService,
      }
    ];

    return {
      module: LeadServiceModule,
      imports: [
        ...(options.useMessageBrokerForCommand ? [MessageBrokerModule.forRoot(options.messageBrokerOptions)] : []),
        DatabaseModule.forRoot({
          type: options.databaseOptions.type,
          connectionString: options.databaseOptions.connectionString,
          models: [
            { name: Lead.name, schema: LeadSchema },
          ]
        })
      ],
      providers: [...providers],
      exports: [ILeadService],
    };
  }
}