// filter.module.ts
import { ConfigurableModuleBuilder, DynamicModule, Module } from '@nestjs/common';
import { AccountServiceModule } from './accounts';
import { CheckInServiceModule } from './check-ins';
import { DealServiceModule } from './deals';
import { DeliveryServiceModule } from './deliveries';
import { LeadServiceModule } from './leads';
import { PackageCrmModuleOptions } from './package-crm.options.interface';
import { QuoteServiceModule } from './quotes';
import { TaskServiceModule } from './tasks';

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<PackageCrmModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({})
export class PackageCrmModule extends ConfigurableModuleClass {
  static forRoot(options: PackageCrmModuleOptions): DynamicModule {

    return {
      module: PackageCrmModule,
      imports: [
        AccountServiceModule,//.forRoot(options),
        DealServiceModule,//.forRoot(options),
        LeadServiceModule.forRoot({ ...options }),
        TaskServiceModule,//.forRoot(options),
        CheckInServiceModule,//.forRoot(options),
        DeliveryServiceModule,//.forRoot(options),
        QuoteServiceModule,//.forRoot(options),
      ],
      providers: [],
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