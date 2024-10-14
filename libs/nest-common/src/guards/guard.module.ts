import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakAuthGuard } from './keycloak-auth.guard';
import { KeycloakResourceGuard } from './keycloak-resource.guard';
import { NestAuthGuard } from './nest-auth.guard';
import { NestResourceGuard } from './nest-resource.guard';
import { ENV_CONSTANT } from '@dealer365-backend/shared';

@Module({})
export class GuardModule {
  static forRoot(): DynamicModule {
    return {
      module: GuardModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: APP_GUARD,
          useFactory: (configService: ConfigService) => {
            const authGuardType = configService.get<string>(ENV_CONSTANT.CRM_AUTH_GUARD_TYPE);
            if (authGuardType.toLowerCase() === 'keycloak') {
              return new KeycloakAuthGuard();
            } else if (authGuardType.toLowerCase() === 'nest') {
              return new NestAuthGuard();
            }
            return null;
          },
          inject: [ConfigService],
        },
        {
          provide: APP_GUARD,
          useFactory: (configService: ConfigService) => {
            const resourceGuardType = configService.get<string>(ENV_CONSTANT.CRM_RESOURCE_GUARD_TYPE);
            if (resourceGuardType.toLowerCase() === 'keycloak') {
              return new KeycloakResourceGuard();
            } else if (resourceGuardType.toLowerCase() === 'nest') {
              return new NestResourceGuard();
            }
            return null;
          },
          inject: [ConfigService],
        },
      ],
    };
  }
}