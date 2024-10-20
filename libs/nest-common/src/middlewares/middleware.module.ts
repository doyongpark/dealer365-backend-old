// middleware.module.ts
import { ConfigurableModuleBuilder, Inject, Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CorrelationIdMiddleware, MethodOverrideMiddleware, UserContextMiddleware } from './impl';

// 설정 옵션 인터페이스 정의
export interface MiddlewareModuleOptions {
  useMethodOverrideMiddleware: boolean;
}

// ConfigurableModuleBuilder 사용하여 동적 모듈 정의
const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MiddlewareModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({})
export class MiddlewareModule extends ConfigurableModuleClass implements NestModule {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: MiddlewareModuleOptions
  ) {
    super();
  }

  /**
  MiddlewareConsumer의 실행 순서는 중요하다. UserContextMiddleware에서 AsyncLocalStorage.run()을 호출하므로, 
  가장 먼저 실행 되어야 RequestContextService에 UserContext를 설정할 수 있다.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    if (this.options?.useMethodOverrideMiddleware)
      consumer
        .apply(MethodOverrideMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
