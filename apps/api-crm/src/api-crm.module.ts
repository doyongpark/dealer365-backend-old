import { ConfigModule } from '@dealer365-backend/config';
import { CrmServiceModule } from '@dealer365-backend/crm-service';
import { CorrelationIdMiddleware, MethodOverrideMiddleware, UserContextMiddleware } from '@dealer365-backend/nest-common';
import { CustomLoggerModule, ENV_CONSTANT } from '@dealer365-backend/shared';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCrmController } from './api-crm.controller';
import { ApiCrmService } from './api-crm.service';

@Module({
  imports: [ConfigModule, CrmServiceModule, CustomLoggerModule.forRoot()],
  controllers: [ApiCrmController],
  providers: [ApiCrmService,],
})
export class ApiCrmModule {
  constructor(private readonly configService: ConfigService) { }

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