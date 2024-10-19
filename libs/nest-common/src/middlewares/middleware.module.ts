// middleware.module.ts
import { ConfigurableModuleBuilder, DynamicModule, MiddlewareConsumer, Module, NestModule, Provider, RequestMethod } from '@nestjs/common';
import { CorrelationIdMiddleware, MethodOverrideMiddleware } from './impl';
import { UserContextMiddleware } from './impl/user-context.middleware';
import { UserContextService } from './user-context.service';
import { RequestContextService } from './request-context.service';

export interface MiddlewareModuleOptions {
  useMethodOverrideMiddleware?: boolean;
}

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MiddlewareModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({
  providers: [UserContextService, RequestContextService]
})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(UserContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(MethodOverrideMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}