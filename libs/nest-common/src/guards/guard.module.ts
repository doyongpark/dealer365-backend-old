// guard.module.ts
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GuardModuleOptions } from './guard-config.interface';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './guard.module-definition';
import { KeycloakAuthGuard } from './impl/keycloak-auth.guard';
import { KeycloakResourceGuard } from './impl/keycloak-resource.guard';
import { NestAuthGuard } from './impl/nest-auth.guard';
import { NestResourceGuard } from './impl/nest-resource.guard';

@Module({})
export class GuardModule extends ConfigurableModuleClass {
  static forRoot(options: GuardModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: MODULE_OPTIONS_TOKEN,
        useValue: options,
      },
    ];

    if (options?.useKeycloakGuards) {
      if (!options.keycloakOptions) {
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
          provide: 'KEYCLOAK_OPTIONS',
          useValue: options.keycloakOptions,
        },
      );
    }

    if (options?.useNestGuards) {
      providers.push(
        {
          provide: APP_GUARD,
          useClass: NestAuthGuard,
        },
        {
          provide: APP_GUARD,
          useClass: NestResourceGuard,
        },
      );
    }

    return {
      module: GuardModule,
      providers: providers,
    };
  }
}