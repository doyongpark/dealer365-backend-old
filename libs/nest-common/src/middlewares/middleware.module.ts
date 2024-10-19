// middleware.module.ts
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CorrelationIdMiddleware, MethodOverrideMiddleware } from './impl';
import { UserContextMiddleware } from './impl/user-context.middleware';
import { RequestContextService } from './request-context.service';
import { UserContextService } from './user-context.service';

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