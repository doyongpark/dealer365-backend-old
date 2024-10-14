import { ENV_CONSTANT } from '@dealer365-backend/shared';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditLogInterceptor } from './audit-log.interceptor';
import { ResponseTransformInterceptor } from './response.transform.interceptor';

@Module({})
export class InterceptorModule {
  static forRoot(): DynamicModule {
    return {
      module: InterceptorModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useFactory: (configService: ConfigService) => {
            const useAuditLogInterceptor = configService.get<boolean>(ENV_CONSTANT.CRM_USE_AUDIT_LOG_INTERCEPTOR);
            return useAuditLogInterceptor ? new AuditLogInterceptor() : null;
          },
          inject: [ConfigService],
        },
        {
          provide: APP_INTERCEPTOR,
          useFactory: (configService: ConfigService) => {
            const useResponseInterceptor = configService.get<boolean>(ENV_CONSTANT.CRM_USE_RESPONSE_INTERCEPTOR);
            return useResponseInterceptor ? new ResponseTransformInterceptor() : null;
          },
          inject: [ConfigService],
        },
      ],
    };
  }
}