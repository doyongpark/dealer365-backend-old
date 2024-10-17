// filter.module.ts
import { QueueProviderModule } from '@dealer365-backend/queue-provider';
import { DynamicModule, Module } from '@nestjs/common';
import { AccountServiceModule } from './accounts';
import { CheckInServiceModule } from './check-ins';
import { DealServiceModule } from './deals';
import { DeliveryServiceModule } from './deliveries';
import { LeadServiceModule } from './leads';
import { PackageCrmModuleOptions } from './package-crm-config.interface';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './package-crm.module-definition';
import { QuoteServiceModule } from './quotes';
import { TaskServiceModule } from './tasks';

@Module({})
export class PackageCrmModule extends ConfigurableModuleClass {
  static forRoot(options: PackageCrmModuleOptions): DynamicModule {

    if (options?.useQueue && !options.queueOptions) {
      throw new Error('Queue options must be provided when useQueue is true');
    }

    return {
      module: PackageCrmModule,
      imports: [
        AccountServiceModule,//.forRoot(options),
        DealServiceModule,//.forRoot(options),
        LeadServiceModule.forRoot(options),
        TaskServiceModule,//.forRoot(options),
        CheckInServiceModule,//.forRoot(options),
        DeliveryServiceModule,//.forRoot(options),
        QuoteServiceModule,//.forRoot(options),
      ],
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
      exports: [
        AccountServiceModule,
        DealServiceModule,
        LeadServiceModule,
        TaskServiceModule,
        CheckInServiceModule,
        DeliveryServiceModule,
        QuoteServiceModule,
      ],
    };
  };
}