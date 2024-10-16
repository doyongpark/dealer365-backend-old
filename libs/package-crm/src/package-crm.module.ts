// filter.module.ts
import { QueueProviderModule } from '@dealer365-backend/queue-provider';
import { DynamicModule, Module } from '@nestjs/common';
import { AccountServiceModule } from './accounts';
import { CheckInServiceModule } from './check-ins';
import { DealServiceModule } from './deals';
import { DeliveryServiceModule } from './deliveries';
import { LeadEntity, LeadServiceModule } from './leads';
import { PackageCrmModuleOptions } from './package-crm-config.interface';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './package-crm.module-definition';
import { QuoteServiceModule } from './quotes';
import { TaskServiceModule } from './tasks';
import { DatabaseModule } from '@dealer365-backend/database';
import { SchemaFactory } from '@nestjs/mongoose';

@Module({})
export class PackageCrmModule extends ConfigurableModuleClass {
  static forRoot(options: PackageCrmModuleOptions): DynamicModule {

    if (options?.useQueue && !options.queueOptions) {
      throw new Error('Queue options must be provided when useQueue is true');
    }

    return {
      module: PackageCrmModule,
      imports: [
        DatabaseModule.forRoot({
          type: options.databaseOptions.type,
          uri: options.databaseOptions.url,
          models: [
            { name: LeadEntity.name, schema: SchemaFactory.createForClass(LeadEntity) },
            // Add other models here
          ],
        }),
        AccountServiceModule,//.forRoot(options),
        DealServiceModule,//.forRoot(options),
        LeadServiceModule.forRoot(options),
        TaskServiceModule,//.forRoot(options),
        CheckInServiceModule,//.forRoot(options),
        DeliveryServiceModule,//.forRoot(options),
        QuoteServiceModule,//.forRoot(options),
        ...(options.useQueue ? [QueueProviderModule.forRoot(options.queueOptions)] : []),
      ],
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
      exports: [
        DatabaseModule,
        AccountServiceModule,
        DealServiceModule,
        LeadServiceModule,
        TaskServiceModule,
        CheckInServiceModule,
        DeliveryServiceModule,
        QuoteServiceModule,
        ...(options.useQueue ? [QueueProviderModule] : []),
      ],
    };
  };
}