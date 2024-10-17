import { DatabaseModule } from '@dealer365-backend/database';
import { CRM_SERVICE_OPTIONS } from '@dealer365-backend/shared';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PackageCrmModuleOptions } from '../package-crm-config.interface';
import { LeadSchema } from './entities';
import { LeadAsyncService, LeadSyncService } from './services';
import { ILeadService } from './services/lead.service.interface';
import { QueueProviderModule } from '@dealer365-backend/queue-provider';

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
        useClass: options?.useQueue ? LeadAsyncService : LeadSyncService,
      },
    ];

    return {
      module: LeadServiceModule,
      imports: [
        ...(options.useQueue ? [QueueProviderModule.forRoot({ ...options.queueOptions, queueName: 'crm-queue' })] : []),
        DatabaseModule.forRoot({
          type: options.databaseOptions.type,
          uri: options.databaseOptions.url,
          models: [
            { name: 'Lead', schema: LeadSchema },
            { name: 'Lead2', schema: LeadSchema }
          ],
        }),],
      providers: providers,
      exports: [ILeadService],
    };
  }
}