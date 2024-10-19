// nest-common.module.ts
import { AsyncLocalStorageModule } from '@dealer365-backend/shared';
import { ConfigurableModuleBuilder, DynamicModule, Inject, MiddlewareConsumer, Module, NestModule, Provider, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter, SENTRY_OPTION, SentryExceptionFilter } from './filters';
import { KeycloakAuthGuard, KeycloakResourceGuard } from './guards';
import { LoggingInterceptor, ResponseConvertorInterceptor } from './interceptors';
import { CorrelationIdMiddleware, MethodOverrideMiddleware, UserContextMiddleware } from './middlewares';

interface NestCommonModuleOptions {
  exceptionFilterOptions?: {
    useSentryExceptionFilter?: boolean;
    sentryOptions?: {
      sentryDsn: string;
      environment: string;
    };
  };
  interceptorOptions?: {
    useLoggingInterceptor?: boolean;
  };
  guardOptions?: {
    useKeycloakGuards?: boolean;
    keycloakOptions?: {
      clientId: string;
      clientSecret: string;
      realm: string;
      authServerUrl: string;
    }; // Optional, only required if useKeycloakGuards is true
  };
  middlewareOptions?: {
    useMethodOverrideMiddleware: boolean;
  };
}
const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<NestCommonModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({})
export class NestCommonModule extends ConfigurableModuleClass implements NestModule {

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: NestCommonModuleOptions
  ) {
    super();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(UserContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    if (this.options?.middlewareOptions?.useMethodOverrideMiddleware)
      consumer
        .apply(MethodOverrideMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  static forRoot(options: NestCommonModuleOptions): DynamicModule {

    const providers: Provider[] = [
      {
        provide: MODULE_OPTIONS_TOKEN,
        useValue: options,
      }, {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter,
      }, {
        provide: APP_INTERCEPTOR,
        useClass: ResponseConvertorInterceptor,
      }
    ];

    if (options?.exceptionFilterOptions?.useSentryExceptionFilter) {
      if (!options.exceptionFilterOptions?.sentryOptions) {
        throw new Error('Sentry options must be provided when useSentryExceptionFilter is true');
      }

      providers.push(
        {
          provide: SENTRY_OPTION,
          useValue: options.exceptionFilterOptions?.sentryOptions,
        },
        {
          provide: APP_FILTER,
          useClass: SentryExceptionFilter,
        },
      );
    }

    //if (options && options.interceptorOptions?.useLoggingInterceptor) {
      providers.push({
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      });
    //}

    if (options?.guardOptions?.useKeycloakGuards) {
      if (!options.guardOptions?.keycloakOptions) {
        throw new Error('Keycloak options must be provided when useKeycloakGuards is true');
      }

      providers.push(
        {
          provide: APP_GUARD,
          useClass: KeycloakAuthGuard,
        },
        {
          provide: APP_GUARD,
          useClass: KeycloakResourceGuard,
        },
        {
          provide: SENTRY_OPTION,
          useValue: options.guardOptions?.keycloakOptions,
        },
      );
    }





    return {
      module: NestCommonModule,
      imports: [
        AsyncLocalStorageModule,
      ],
      providers: [...providers,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        }, {
          provide: SENTRY_OPTION,
          useValue: options.guardOptions?.keycloakOptions,
        },
      ]
    };
  }
}