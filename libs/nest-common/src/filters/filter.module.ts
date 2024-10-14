import { ENV_CONSTANT } from '@dealer365-backend/shared';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({})
export class FilterModule {
  static forRoot(): DynamicModule {
    return {
      module: FilterModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: APP_FILTER,
          useFactory: (configService: ConfigService) => {
            const useHttpExceptionFilter = configService.get<boolean>(ENV_CONSTANT.CRM_USE_HTTP_EXCEPTION_FILTER);
            return useHttpExceptionFilter ? new HttpExceptionFilter() : null;
          },
          inject: [ConfigService],
        },
      ],
    };
  }
}