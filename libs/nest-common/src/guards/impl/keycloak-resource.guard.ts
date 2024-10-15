// keycloak-resource.guard.ts
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { KeycloakOptions } from './keycloak-options.interface';
import { Reflector } from '@nestjs/core';
import * as KeycloakConnect from 'keycloak-connect';

@Injectable()
export class KeycloakResourceGuard implements CanActivate {
  private keycloak: KeycloakConnect.Keycloak;

  constructor(
    @Inject('KEYCLOAK_OPTIONS') private readonly options: KeycloakOptions,
    private readonly reflector: Reflector,
  ) {
    const keycloakConfig: KeycloakConnect.KeycloakConfig = {
      realm: this.options.realm,
      'auth-server-url': this.options.authServerUrl,
      'ssl-required': 'external',
      resource: this.options.clientId, // Changed from clientId to resource
      'confidential-port': 0,
    };

    this.keycloak = new KeycloakConnect({}, keycloakConfig);
    // this.keycloak.accessToken = {
    //   secret: this.options.clientSecret,
    // };
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const resource = this.reflector.get<string>('resource', context.getHandler());

    return new Promise<boolean>((resolve, reject) => {
      this.keycloak.protect(resource)(request, response, (err) => {
        if (err) {
          return reject(false);
        }
        resolve(true);
      });
    });
  }
}