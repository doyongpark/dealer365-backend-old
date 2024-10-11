import { Module, DynamicModule } from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { RemoteConfigService } from './remote-config.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module'; // UserModule 임포트
import { ProductModule } from './product/product.module'; // ProductModule 임포트

@Module({})
export class ConfigurableModule {
  static register(): DynamicModule {
    return {
      module: ConfigurableModule,
      imports: [
        ConfigModule.forRoot(),
        UserModule, // UserModule 추가
        ProductModule, // ProductModule 추가
      ],
      providers: [
        DynamicService,
        RemoteConfigService,
      ],
      exports: [DynamicService, RemoteConfigService],
    };
  }
}
