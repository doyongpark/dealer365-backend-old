import { ConfigModule } from '@dealer365-backend/config';
import { NestCommonModule } from '@dealer365-backend/nest-common';
import { PackageCrmModule } from '@dealer365-backend/package-crm';
import { SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ApiLeadModule } from './leads';

const modules = [ApiLeadModule];

@Module({
  imports: [
    ConfigModule,
    SharedModule.forRoot({
      loggerOptions: {
        // provider: 'pino',  // 예시 값
        // level: 'info',
        // format: 'json',
        // logType: 'file',
      },
    }),
    NestCommonModule.forRoot({
      exceptionFilterOptions: {
        // useSentryExceptionFilter: true,
        // sentryOptions: {
        //   sentryDsn: 'your-sentry-dsn',
        //   environment: 'your-environment',
        // },
      },
      interceptorOptions: {
        // useLoggingInterceptor: true,
      },
      guardOptions: {
        // useKeycloakGuards: true,
        // keycloakOptions: {
        //   clientId: 'your-client-id',
        //   clientSecret: 'your-client-secret',
        //   realm: 'your-realm',
        //   authServerUrl: 'https://your-auth-server-url',
        // },
      },
      middlewareOptions: {
        // useMethodOverrideMiddleware: true,
      },
      // Add other options here if available
    }),
    PackageCrmModule.forRoot({
      leadServiceModuleOptions: {
        useCqrs: true,
      }
    }),
    ApiLeadModule
  ],
  controllers: [],
  providers: [],
  exports: [PackageCrmModule]
})
export class ApiCrmModule { }