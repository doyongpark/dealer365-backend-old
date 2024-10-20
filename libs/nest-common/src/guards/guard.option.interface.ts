import { KeycloakOptions } from "./impl";

export interface GuardModuleOptions {
  useKeycloakGuards?: boolean;
  keycloakOptions?: KeycloakOptions;
}