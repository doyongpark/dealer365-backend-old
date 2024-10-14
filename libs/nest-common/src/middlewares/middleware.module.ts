import { ENV_CONSTANT } from '@dealer365-backend/shared';
import { DynamicModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CorrelationIdMiddleware } from './correlation.middleware';
import { MethodOverrideMiddleware } from './method.override.middleware';
import { UserContextMiddleware } from './user-context.middleware';
import { UserContextService } from './user-context.service';

@Module({})
export class MiddlewareModule {
  static forRoot(): DynamicModule {
    return {
      module: MiddlewareModule,
      imports: [ConfigModule],
      providers: [UserContextService],
      exports:[UserContextService]
    };
  }

  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    const useCorrelationIdMiddleware = this.configService.get<boolean>(ENV_CONSTANT.CRM_USE_CORRELATION_MIDDLEWARE);
    const useMethodOverrideMiddleware = this.configService.get<boolean>(ENV_CONSTANT.CRM_USE_METHOD_OVERRIDE_MIDDLEWARE);
    const useUserContextMiddleware = this.configService.get<boolean>(ENV_CONSTANT.CRM_USE_USER_CONTEXT_MIDDLEWARE);

    if (useCorrelationIdMiddleware) {
      consumer
        .apply(CorrelationIdMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    }

    if (useMethodOverrideMiddleware) {
      consumer
        .apply(MethodOverrideMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    }

    if (useUserContextMiddleware) {
      consumer
        .apply(UserContextMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
  }
}