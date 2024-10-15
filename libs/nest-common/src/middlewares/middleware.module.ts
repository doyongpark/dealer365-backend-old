// middleware.module.ts
import { DynamicModule, MiddlewareConsumer, Module, NestModule, Provider, RequestMethod } from '@nestjs/common';
import { CorrelationIdMiddleware, MethodOverrideMiddleware, UserContextMiddleware, UserContextService } from './impl';
import { MiddlewareModuleOptions } from './middleware-config.interface';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './middleware.module-definition';

@Module({})
export class MiddlewareModule extends ConfigurableModuleClass implements NestModule {
  static forRoot(options: MiddlewareModuleOptions): DynamicModule {
    const providers: Provider[] = [
      UserContextService,
      {
        provide: MODULE_OPTIONS_TOKEN,
        useValue: options,
      },
    ];

    const module: DynamicModule = {
      module: MiddlewareModule,
      providers: providers,
      exports: [UserContextService],
    };

    (module as any).configure = (consumer: MiddlewareConsumer) => {
      consumer
        .apply(CorrelationIdMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
      consumer
        .apply(UserContextMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });

      if (options?.useMethodOverrideMiddleware) {
        consumer
          .apply(MethodOverrideMiddleware)
          .forRoutes({ path: '*', method: RequestMethod.ALL });
      }
    };

    return module;
  }
}