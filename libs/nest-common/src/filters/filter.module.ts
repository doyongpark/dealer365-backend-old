// filter.module.ts
import { SENTRY_OPTION } from '@dealer365-backend/shared';
import { ConfigurableModuleBuilder, DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { FilterModuleOptions } from './filter.option.interface';
import { HttpExceptionFilter } from './impl';

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<FilterModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({})
export class FilterModule extends ConfigurableModuleClass {
  static forRoot(options: FilterModuleOptions): DynamicModule {

    if (options?.useSentry && !options.sentryOptions)
      throw new Error('Sentry options must be provided when useSentry is true');

    const providers: Provider[] = [{
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }];

    if (options?.useSentry) {
      providers.push({
        provide: SENTRY_OPTION,
        useValue: options.sentryOptions,
      });
    }

    return {
      module: FilterModule,
      providers: providers,
    };
  }
}