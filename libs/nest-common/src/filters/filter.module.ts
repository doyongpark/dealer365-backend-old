// filter.module.ts
import { ConfigurableModuleBuilder, DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SENTRY_OPTION } from './constatns';
import { HttpExceptionFilter, SentryExceptionFilter, SentryOptions } from './impl';

export interface FilterModuleOptions {
  useSentryExceptionFilter?: boolean;
  sentryOptions?: SentryOptions;
}

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<FilterModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({})
export class FilterModule extends ConfigurableModuleClass {
  static forRoot(options: FilterModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: MODULE_OPTIONS_TOKEN,
        useValue: options,
      }, {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter,
      }
    ];

    if (options?.useSentryExceptionFilter) {
      if (!options.sentryOptions) {
        throw new Error('Sentry options must be provided when useSentryExceptionFilter is true');
      }

      providers.push(
        {
          provide: SENTRY_OPTION,
          useValue: options.sentryOptions,
        },
        {
          provide: APP_FILTER,
          useClass: SentryExceptionFilter,
        },
      );
    }

    return {
      module: FilterModule,
      providers: providers,
    };
  }
}