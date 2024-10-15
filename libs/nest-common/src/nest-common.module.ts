// nest-common.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { FilterModule } from './filters';
import { GuardModule } from './guards';
import { InterceptorModule } from './interceptors';
import { MiddlewareModule } from './middlewares';
import { NestCommonModuleOptions } from './nest-common-config.interface';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './nest-common.module-definition';

@Module({})
export class NestCommonModule extends ConfigurableModuleClass {
  static forRoot(options: NestCommonModuleOptions): DynamicModule {
    return {
      module: NestCommonModule,
      imports: [
        FilterModule.forRoot(options.exceptionFilterOptions),
        InterceptorModule.forRoot(options.interceptorOptions),
        GuardModule.forRoot(options.guardOptions),
        MiddlewareModule.forRoot(options.middlewareOptions),
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