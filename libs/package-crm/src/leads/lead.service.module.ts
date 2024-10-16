import { CRM_SERVICE_OPTIONS } from '@dealer365-backend/shared';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PackageCrmModuleOptions } from '../package-crm-config.interface';
import { ILeadRepository, LeadAsyncRepository, LeadSyncRepository } from './repositories';
import { LeadService } from './services';
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
        useClass: LeadService,
      },
      {
        provide: ILeadRepository,
        useClass: options?.useQueue ? LeadAsyncRepository : LeadSyncRepository,
      }
    ];

    return {
      module: LeadServiceModule,
      imports: [],
      providers: providers,
      exports: [ILeadService, ILeadRepository],
    };
  }
}