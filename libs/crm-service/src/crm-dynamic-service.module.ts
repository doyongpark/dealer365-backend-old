import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CrmDynamicConfigService } from './crm-dynamic-config.service';
import { CrmDynamicService } from './crm-dynamic.service';
import { ProductModule } from './services/product/product.module';
import { UserModule } from './services/user/user.module';

@Module({})
export class CrmDynamicServiceModule {
  static register(): DynamicModule {
    return {
      module: CrmDynamicServiceModule,
      imports: [
        UserModule,
        ProductModule
      ],
      providers: [
        CrmDynamicService,
        CrmDynamicConfigService,
        ConfigService
      ],
      exports: [CrmDynamicService],
    };
  }
}
