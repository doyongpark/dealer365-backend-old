import { RequestContextService, USER_CONTEXT } from '@dealer365-backend/shared';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { jwtDecode } from "jwt-decode";

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    RequestContextService.run(() => {
      if (req?.headers?.authorization) {
        var claim: any = jwtDecode(req.headers.authorization as string);
        RequestContextService.set(USER_CONTEXT, claim);
      }
      next();
    });
  }
}