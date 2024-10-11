import { DynamicModule, Module, Logger } from '@nestjs/common';
import { ConfigService } from './config.service';
import { VehicleModule } from '../vehicle/vehicle.module'; // 경로 수정
import { OwnerModule } from '../owner/owner.module'; // 경로 수정

@Module({})
export class ConfigurableModule {
  private static logger = new Logger(ConfigurableModule.name);

  static register(configService: ConfigService): DynamicModule {
    const module = configService.module === 'vehicle' ? VehicleModule : OwnerModule;

    this.logger.log(`ConfigurableModule registered with module: ${configService.module}`);

    return {
      module: ConfigurableModule,
      imports: [module],
    };
  }
}
