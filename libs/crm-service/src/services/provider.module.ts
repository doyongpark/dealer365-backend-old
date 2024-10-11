import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductModule } from '../providers/product/product.module';
import { UserModule } from '../providers/user/user.module';
import { CrmServiceBuilder } from './crm-service.builder';
import { CrmServiceConfig } from './crm-service.config';

@Module({})
export class ProviderModule {
  static register(): DynamicModule {
    return {
      module: ProviderModule,
      imports: [
        UserModule,
        ProductModule
      ],
      providers: [
        ConfigService,//global config
        CrmServiceBuilder,
        CrmServiceConfig,
      ],
      exports: [CrmServiceBuilder],
    };
  }
}
