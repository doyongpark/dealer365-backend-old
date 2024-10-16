import { LEAD_SERVICE_OPTIONS } from '@dealer365-backend/shared';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { LeadServiceModuleOptions } from './lead-service-config.interface';
import { ILeadRepository, LeadAsyncRepository, LeadSyncRepository } from './repositories';
import { LeadService } from './services';
import { ILeadService } from './services/lead.service.interface';

@Module({})
export class LeadServiceModule {
  static forRoot(options: LeadServiceModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: LEAD_SERVICE_OPTIONS,
        useValue: options,
      },
      {
        provide: ILeadService,
        useClass: LeadService,
      },
      {
        provide: ILeadRepository,
        useClass: options?.useCqrs ? LeadAsyncRepository : LeadSyncRepository,
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