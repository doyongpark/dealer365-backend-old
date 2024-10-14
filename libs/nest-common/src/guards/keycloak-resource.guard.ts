import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class KeycloakResourceGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    Logger.warn('KeycloakResourceGuard is not implemented', 'KeycloakResourceGuard');
    return true;
  }
}