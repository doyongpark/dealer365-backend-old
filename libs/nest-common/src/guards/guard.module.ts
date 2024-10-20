import { SENTRY_OPTION } from '@dealer365-backend/shared';
import { ConfigurableModuleBuilder, DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakAuthGuard } from './impl/keycloak-auth.guard';
import { KeycloakOptions } from "./impl/keycloak-options.interface";
import { KeycloakResourceGuard } from './impl/keycloak-resource.guard';


export interface GuardModuleOptions {
  useKeycloakGuards?: boolean;
  keycloakOptions?: KeycloakOptions; // Optional, only required if useKeycloakGuards is true
}

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<GuardModuleOptions>()
    .setClassMethodName('forRoot')
    .build();

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
          provide: SENTRY_OPTION,
          useValue: options.keycloakOptions,
        },
      );
    }

    return {
      module: GuardModule,
      providers: providers,
    };
  }
}