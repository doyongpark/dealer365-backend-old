// shared.module.ts
import { CustomLoggerModule, CustomLoggerModuleOptions } from '@dealer365-backend/custom-logger';
import { ConfigurableModuleBuilder, DynamicModule, Module } from '@nestjs/common';

interface SharedModuleOptions {
  loggerOptions?: CustomLoggerModuleOptions;
}

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<SharedModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

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