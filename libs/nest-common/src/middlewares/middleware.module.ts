// middleware.module.ts
import { ConfigurableModuleBuilder, DynamicModule, MiddlewareConsumer, Module, NestModule, Provider, RequestMethod } from '@nestjs/common';
import { CorrelationIdMiddleware, MethodOverrideMiddleware } from './impl';
import { UserContextMiddleware } from './impl/user-context.middleware';
import { RequestContextService } from './request-context.service';

export interface MiddlewareModuleOptions {
    useMethodOverrideMiddleware?: boolean;
}

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MiddlewareModuleOptions>()
    .setClassMethodName('forRoot')
    .build();

@Module({})
export class MiddlewareModule extends ConfigurableModuleClass implements NestModule {
  static forRoot(options: MiddlewareModuleOptions): DynamicModule {
    const providers: Provider[] = [
      RequestContextService,
      {
        provide: MODULE_OPTIONS_TOKEN,
        useValue: options,
      },
    ];

    const module: DynamicModule = {
      module: MiddlewareModule,
      providers: providers,
      exports: [RequestContextService],
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