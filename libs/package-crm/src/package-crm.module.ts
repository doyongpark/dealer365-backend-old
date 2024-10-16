// filter.module.ts
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
    return {
      module: PackageCrmModule,
      imports: [
        AccountServiceModule.forRoot(options?.accountServiceModuleOptions),
        DealServiceModule,//.forRoot(options?.dealServiceModuleOptions),
        LeadServiceModule.forRoot(options?.leadServiceModuleOptions),
        TaskServiceModule,//.forRoot(options?.taskServiceModuleOptions),
        CheckInServiceModule,//.forRoot(options?.checkInServiceModuleOptions),
        DeliveryServiceModule,//.forRoot(options?.deliveryServiceModuleOptions),
        QuoteServiceModule,//.forRoot(options?.quoteServiceModuleOptions),
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