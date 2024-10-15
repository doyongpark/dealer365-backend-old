import { KeycloakOptions } from "./impl/keycloak-options.interface";

// guard-config.interface.ts
export interface GuardModuleOptions {
  useKeycloakGuards?: boolean;
  keycloakOptions?: KeycloakOptions; // Optional, only required if useKeycloakGuards is true
}