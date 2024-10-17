import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { jwtDecode } from "jwt-decode";
import { UserContextService } from './user-context.service';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.debug(this.constructor.name);
    UserContextService.run(() => {
      if (req?.headers?.authorization) {
        var claim: any = jwtDecode(req.headers.authorization as string);
        UserContextService.set(claim);
      }
      next();
    });
  }
}