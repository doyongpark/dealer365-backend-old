import { DynamicModule, Module } from '@nestjs/common';
import { CrmRemoteConfigLoader } from './loaders/crm-remote-config.loder';

import {
  CreateModule,
  CrmCreateServiceBuilder,
  CrmDeleteServiceBuilder,
  CrmQueryServiceBuilder,
  CrmUpdateServiceBuilder,
  DeleteModule,
  QueryModule,
  UpdateModule
} from './services';


@Module({})
export class CrmServiceDynamicModule {
  static register(): DynamicModule {
    return {
      module: CrmServiceDynamicModule,
      imports: [
        CreateModule,
        UpdateModule,
        DeleteModule,
        QueryModule
      ],
      providers: [
        CrmCreateServiceBuilder,
        CrmUpdateServiceBuilder,
        CrmDeleteServiceBuilder,
        CrmQueryServiceBuilder,
        CrmRemoteConfigLoader,
      ],
      exports: [CrmCreateServiceBuilder,
        CrmDeleteServiceBuilder,
        CrmQueryServiceBuilder,
        CrmUpdateServiceBuilder,],
    };
  }
}
