import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as KeycloakConnect from 'keycloak-connect';
import { KeycloakOptions } from './keycloak-options.interface';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  private keycloak: KeycloakConnect.Keycloak;

  constructor(
    @Inject('KEYCLOAK_OPTIONS') private readonly options: KeycloakOptions,
    private readonly reflector: Reflector,
  ) {
    const keycloakConfig: KeycloakConnect.KeycloakConfig = {
      realm: this.options.realm,
      'auth-server-url': this.options.authServerUrl,
      'ssl-required': 'external',
      resource: this.options.clientId,
      'confidential-port': 0,
      // credentials: {
      //   secret: this.options.clientSecret,
      // },
    };

    this.keycloak = new KeycloakConnect({}, keycloakConfig);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    Logger.log(this.constructor.name);
    return true;
  }
}