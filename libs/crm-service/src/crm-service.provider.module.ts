import { DynamicModule, Module } from '@nestjs/common';
import { CrmRemoteConfigLoader } from './loaders/crm-remote-config.loder';
import { CrmDynamicService } from './services/crm.dynamic.service';

import {
  ProductModule,
  UserModule
} from './providers';

@Module({})
export class ServiceProviderModule {
  static register(): DynamicModule {
    return {
      module: ServiceProviderModule,
      imports: [
        UserModule,
        ProductModule
      ],
      providers: [
        CrmDynamicService,
        CrmRemoteConfigLoader,
      ],
      exports: [CrmDynamicService],
    };
  }
}
