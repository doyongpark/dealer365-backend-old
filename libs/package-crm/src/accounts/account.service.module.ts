import { DynamicModule, Module } from '@nestjs/common';
import { AccountServiceModuleOptions } from './account-service-config.interface';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './account-service.module-definition';

@Module({})
export class AccountServiceModule extends ConfigurableModuleClass {
  static forRoot(options: AccountServiceModuleOptions): DynamicModule {
    const providers = [];
    return {
      module: AccountServiceModule,
      providers: providers,
      exports: [],
    };
  }
}
