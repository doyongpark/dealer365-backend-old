import { HttpHeaderKeysEnum, REQUEST_CONTEXT } from '@dealer365-backend/shared';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<Map<string, any>>) { }
  
  use(req: Request, res: Response, next: NextFunction) {
    Logger.debug(this.constructor.name);
    //Request Id
    const request_id_key = HttpHeaderKeysEnum.REQUEST_ID;
    //always use lowcase when read header.
    let requestId = req.headers[request_id_key.toLowerCase()] || uuidv4();

    if (!req.headers[request_id_key.toLowerCase()]) {
      req.headers[request_id_key.toLowerCase()] = requestId;
    }
    if (!res.getHeader(request_id_key.toLowerCase())) {
      res.setHeader(request_id_key, requestId);
    }

    //Correlation Id
    const correlation_id_key = HttpHeaderKeysEnum.CORRELATION_ID;
    //always use lowcase when read header.
    let correlationId = req.headers[correlation_id_key.toLowerCase()] || uuidv4();

    if (!req.headers[correlation_id_key.toLowerCase()]) {
      req.headers[correlation_id_key.toLowerCase()] = correlationId;
    }
    if (!res.getHeader(correlation_id_key.toLowerCase())) {
      res.setHeader(correlation_id_key, correlationId);
    }
    if (this.als.getStore()) {
      this.als.getStore().set(REQUEST_CONTEXT, req);
      next();
    }
    else {
      const store = new Map<string, any>();
      store.set(REQUEST_CONTEXT, req);
      this.als.run(store, () => next());
    }
  }
}
