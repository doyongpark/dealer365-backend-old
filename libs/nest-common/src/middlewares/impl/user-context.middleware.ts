import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { jwtDecode } from "jwt-decode";
import { RequestContextService } from '../request-context.service';
import { USER_CONTEXT } from '@dealer365-backend/shared';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.debug(this.constructor.name);
    RequestContextService.run();
    if (req?.headers?.authorization) {
      var claim: any = jwtDecode(req.headers.authorization as string);
      RequestContextService.set(USER_CONTEXT, claim);
    }
    next();
  }
}