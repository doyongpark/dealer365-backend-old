// nest-common.module.ts
import { ConfigurableModuleBuilder, DynamicModule, Module } from '@nestjs/common';
import { FilterModule, FilterModuleOptions } from './filters';
import { GuardModule, GuardModuleOptions } from './guards';
import { InterceptorModule, InterceptorModuleOptions } from './interceptors';
import { MiddlewareModule } from './middlewares';

interface NestCommonModuleOptions {
    exceptionFilterOptions?: FilterModuleOptions;
    interceptorOptions?: InterceptorModuleOptions;
    guardOptions?: GuardModuleOptions;
    //middlewareOptions?: MiddlewareModuleOptions;
}
const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<NestCommonModuleOptions>()
    .setClassMethodName('forRoot')
    .build();

@Module({})
export class NestCommonModule extends ConfigurableModuleClass {
  static forRoot(options: NestCommonModuleOptions): DynamicModule {
    return {
      module: NestCommonModule,
      imports: [
        FilterModule.forRoot(options.exceptionFilterOptions),
        InterceptorModule.forRoot(options.interceptorOptions),
        GuardModule.forRoot(options.guardOptions),
        MiddlewareModule.forRoot({enableLogging: true}),
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