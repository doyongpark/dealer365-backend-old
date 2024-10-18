import { HttpHeaderKeysEnum, REQUEST_CONTEXT, USER_CONTEXT } from "@dealer365-backend/shared";
import { Injectable, Logger, Scope } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { Request } from "express";


@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private static asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();
  private static isRunning = false;

  // Run method to initialize a new context for each request
  static run() {
    if (this.isRunning) {
      Logger.debug('UserContextService is already running.');
      return;
    }
    try {
      const context = new Map<string, any>();
      this.asyncLocalStorage.run(context, () => { });
    } finally {
      this.isRunning = false;
    }
  }

  // Set a value in the current context
  static set(key: string, value: any) {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  // Get a value from the current context
  static get<T>(key: string): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      return store.get(key) as T;
    }
    return undefined;
  }

  static getUserContext<T>(): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      return store.get(USER_CONTEXT) as T;
    }
    return undefined;
  }

  static getRequestIds(): { correlationId: string, requestId: string } | undefined {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      const request = store.get(REQUEST_CONTEXT) as Request;
      return {
        correlationId: request.headers[HttpHeaderKeysEnum.CORRELATION_ID.toLowerCase()]?.toString(),
        requestId: request.headers[HttpHeaderKeysEnum.REQUEST_ID.toLowerCase()]?.toString()
      }
    };
    return undefined;
  }
}