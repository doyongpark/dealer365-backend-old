import { CustomLoggerModule } from '@dealer365-backend/custom-logger';
import { NestCommonModule } from '@dealer365-backend/nest-common';
import { PackageCrmModule } from '@dealer365-backend/package-crm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiLeadController, ApiLeadService } from './leads';

const controllers = [ApiLeadController];
const servies = [ApiLeadService]

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CustomLoggerModule.forRoot({
      provider: process.env.LOGGER_PROVIDER,
      loggerOptions: {
        level: process.env.LOGGER_LEVEL,
        format: process.env.LOGGER_FORMAT,
        logType: process.env.LOGGER_TYPE,
      }
    }),
    NestCommonModule.forRoot({
      exceptionFilterOptions: {
        useSentry: process.env.USE_SENTRY === 'true',
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
      }
    }),
    PackageCrmModule.forRoot({
      databaseOptions: {
        type: process.env.DATABASE_TYPE,
        connectionString: process.env.DATABASE_CONNECTION_STRING,
      },
      useMessageBrokerForCommand: process.env.USE_MESSAGE_BROKER_FOR_COMMAND === 'true',
      messageBrokerOptions: {
        messageBrokerType: process.env.MESSAGE_BROKER_TYPE,
        messageBrokerOptions: {
          connectionString: process.env.MESSAGE_BROKER_CONNECTION_STRING,
          queueName: process.env.MESSAGE_BROKER_QUEUE_NAME,
          useListener: process.env.USE_MESSAGE_BROKER_LISTENER === 'true',
          connectionMaxRetry: parseInt(process.env.MESSAGE_BROKER_CONNECTION_MAX_RETRIES),
          connectionRetryInterval: parseInt(process.env.MESSAGE_BROKER_CONNECTION_RETRY_INTERVAL),
        }
      }
    })
  ],
  controllers: [...controllers],
  providers: [...servies],
  exports: []
})
export class ApiCrmModule { }