// interceptor.module.ts
import { ConfigurableModuleBuilder, DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor, ResponseConvertorInterceptor } from './impl';
import { InterceptorModuleOptions } from './interceptor.option.interface';

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<InterceptorModuleOptions>()
    .setClassMethodName('forRoot')
    .build();

@Module({})
export class InterceptorModule extends ConfigurableModuleClass {
  static forRoot(options: InterceptorModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: MODULE_OPTIONS_TOKEN,
        useValue: options,
      }, {
        provide: APP_INTERCEPTOR,
        useClass: ResponseConvertorInterceptor,
      }
    ];

    if (options?.useLoggingInterceptor) {
      providers.push({
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      });
    }

    return {
      module: InterceptorModule,
      providers: providers,
    };
  }
}