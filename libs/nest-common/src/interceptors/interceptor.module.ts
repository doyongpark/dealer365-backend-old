// interceptor.module.ts
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor, ResponseConvertorInterceptor } from './impl';
import { InterceptorModuleOptions } from './interceptor-config.interface';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './interceptor.module-definition';

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

    if (options && options.useLoggingInterceptor) {
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