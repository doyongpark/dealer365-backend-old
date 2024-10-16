import { DatabaseModule } from '@dealer365-backend/database';
import { CRM_SERVICE_OPTIONS } from '@dealer365-backend/shared';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PackageCrmModuleOptions } from '../package-crm-config.interface';
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
        useClass: options?.useQueue ?  LeadAsyncService : LeadSyncService,
      }
    ];

    return {
      module: LeadServiceModule,
      imports: [DatabaseModule],
      providers: providers,
      exports: [ILeadService],
    };
  }
}