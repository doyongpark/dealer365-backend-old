import { ConfigModule } from '@dealer365-backend/config';
import { NestCommonModule } from '@dealer365-backend/nest-common';
import { SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ApiCrmController } from './api-crm.controller';
import { ApiCrmService } from './api-crm.service';
import { PackageCrmModule } from '@daler365-backend/package-crm';


@Module({
  imports: [
    ConfigModule,
    SharedModule.forRoot({
      loggerOptions: {
        provider: 'safdsaf',  // 예시 값
        level: 'info',
        format: 'json',
        logType: 'file',
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
        useQueue: true,
      }
    }),
  ],
  controllers: [ApiCrmController],
  providers: [ApiCrmService],
})
export class ApiCrmModule { }