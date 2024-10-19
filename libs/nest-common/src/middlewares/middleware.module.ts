// middleware.module.ts
import { ConfigurableModuleBuilder, Inject, Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CorrelationIdMiddleware, MethodOverrideMiddleware, UserContextMiddleware } from './impl';

// 설정 옵션 인터페이스 정의
interface MiddlewareOptions {
  enableLogging: boolean;
}

// ConfigurableModuleBuilder 사용하여 동적 모듈 정의
const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MiddlewareOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({})
export class MiddlewareModule extends ConfigurableModuleClass implements NestModule {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: MiddlewareOptions
  ) {
    super();
  }

  configure(consumer: MiddlewareConsumer) {
    Logger.warn(`Logging enabled: ${this.options.enableLogging}`);
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
