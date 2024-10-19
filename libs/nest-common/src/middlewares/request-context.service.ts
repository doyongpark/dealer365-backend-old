import { HttpHeaderKeysEnum, REQUEST_CONTEXT } from "@dealer365-backend/shared";
import { Injectable, Scope } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private static asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  // Run method to initialize a new context for each request
  static run(callback: () => void) {
    const context = new Map<string, any>();
    this.asyncLocalStorage.run(context, callback);
  }

  // Set a value in the current context
  static set(value: any) {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(REQUEST_CONTEXT, value);
    }
  }

  // Get a value from the current context
  static get<T>(): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      return store.get(REQUEST_CONTEXT);
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