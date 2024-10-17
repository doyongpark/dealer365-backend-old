import { NestCommonModule } from '@dealer365-backend/nest-common';
import { PackageCrmModule } from '@dealer365-backend/package-crm';
import { SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiLeadController, ApiLeadControllerV2, ApiLeadService } from './leads';

const controllers = [ApiLeadController, ApiLeadControllerV2];
const servies = [ApiLeadService]

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SharedModule.forRoot({
      loggerOptions: {
        provider: process.env.LOGGER_PROVIDER || 'nest',
        level: process.env.LOGGER_LEVEL || 'debug',
        format: process.env.LOGGER_FORMAT || 'json',
        logType: process.env.LOGGER_TYPE || 'console',
      },
    }),
    NestCommonModule.forRoot({
      exceptionFilterOptions: {
        useSentryExceptionFilter: process.env.USE_SENTRY_EXCEPTION_FILTER === 'true',
        sentryOptions: {
          sentryDsn: process.env.SENTRY_DSN,
          environment: process.env.SENTRY_ENVIRONMENT,
        },
      },
      interceptorOptions: {
        useLoggingInterceptor: process.env.USE_LOGGING_INTERCEPTOR === 'true',
      },
      guardOptions: {
        useKeycloakGuards: process.env.USE_KEYCLOAK_GUARDS === 'true',
        keycloakOptions: {
          clientId: process.env.KEYCLOAK_CLIENT_ID,
          clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
          realm: process.env.KEYCLOAK_REALM,
          authServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL,
        },
      },
      middlewareOptions: {
        useMethodOverrideMiddleware: process.env.USE_METHOD_OVERRIDE_MIDDLEWARE === 'true',
      },
    }),
    PackageCrmModule.forRoot({
      databaseOptions: {
        type:  process.env.DATABASE_TYPE,
        url: process.env.DATABASE_URL,
      },
      useBroker: process.env.USE_MESSAGE_BROKER === 'true',
      brokerOptions: {
        type: process.env.MESSAGE_BROKER_TYPE,
        url: process.env.MESSAGE_BROKER_SERVICE_CONNECTION_STRING,
        useListener: process.env.USE_MESSAGE_BROKER_LISTENER === 'true',
      },
    })
  ],
  controllers: [...controllers],
  providers: [...servies],
  exports: []
})
export class ApiCrmModule { }