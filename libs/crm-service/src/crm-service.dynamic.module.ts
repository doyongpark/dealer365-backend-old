import { DynamicModule, Module } from '@nestjs/common';
import { RemoteConfigLoader } from './loaders/remote-config.loder';
import { CrmServiceBuilder } from './crm-service.builder';

import {
  ProductModule,
  UserModule
} from './services';

@Module({})
export class CrmServiceDynamicModule {
  static register(): DynamicModule {
    return {
      module: CrmServiceDynamicModule,
      imports: [
        UserModule,
        ProductModule
      ],
      providers: [
        CrmServiceBuilder,
        RemoteConfigLoader,
      ],
      exports: [CrmServiceBuilder],
    };
  }
}
