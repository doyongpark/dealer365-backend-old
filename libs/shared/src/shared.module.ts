// shared.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { CustomLoggerModule } from './loggers';
import { MODULE_OPTIONS_TOKEN } from './shared-module-definition';
import { SharedModuleOptions } from './shared-module-options.interface';

@Module({})
export class SharedModule {
  static forRoot(options: SharedModuleOptions): DynamicModule {
    return {
      module: SharedModule,
      imports: [
        CustomLoggerModule.forRoot(options?.loggerOptions),
      ],
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
    };
  }
}