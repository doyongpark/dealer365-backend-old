import { LOGGER, LOGGER_OPTION } from '@inventis-doyong-park/shared';
import { ConsoleLogger, DynamicModule, Global, Module } from '@nestjs/common';
import { CustomLoggerModuleOptions } from './custom-logger.option.interface';
import { PinoLoggerService, WinstonLoggerService } from './impl';

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
      useValue: options?.loggerOptions,
    });

    return {
      module: CustomLoggerModule,
      providers: providers,
      exports: [LOGGER],
    };
  }
}