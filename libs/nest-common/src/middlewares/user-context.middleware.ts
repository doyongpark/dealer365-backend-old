import { USER_CONTEXT } from '@dealer365-backend/shared';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { NextFunction, Request, Response } from 'express';
import { jwtDecode } from "jwt-decode";

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<Map<string, any>>) { }

  use(req: Request, res: Response, next: NextFunction) {
    if (req?.headers?.authorization) {
      var claim: any = jwtDecode(req.headers.authorization as string);
      if (this.als.getStore()) {
        this.als.getStore().set(USER_CONTEXT, claim);
        next();
      }
      else {
        const store = new Map<string, any>();
        store.set(USER_CONTEXT, claim);
        this.als.run(store, () => next());
      }
    }
  }
}