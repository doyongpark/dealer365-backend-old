import { LOGGER, LOGGER_OPTION } from '@dealer365-backend/shared';
import { ConsoleLogger, DynamicModule, Global, Module } from '@nestjs/common';
import { CustomLoggerModuleOptions } from './custom-logger.option.interface';
import { PinoLoggerService } from './impl/pino.logger.service';
import { WinstonLoggerService } from './impl/winston.logger.service';

@Global()
@Module({})
export class CustomLoggerModule {
  static forRoot(options: CustomLoggerModuleOptions): DynamicModule {
    const providers = [];

    if (options?.provider?.toLowerCase() === 'winston') {
      providers.push({
        provide: LOGGER,
        useClass: WinstonLoggerService,
      });
    } else if (options?.provider?.toLowerCase() === 'pino') {
      providers.push({
        provide: LOGGER,
        useClass: PinoLoggerService,
      });
    } else {
      providers.push({
        provide: LOGGER,
        useClass: ConsoleLogger,
      });
    }

    providers.push({
      provide: LOGGER_OPTION,
      useValue: options,
    });

    return {
      module: CustomLoggerModule,
      providers: providers,
      exports: [LOGGER, LOGGER_OPTION],
    };
  }
}