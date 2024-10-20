import { Injectable, Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { CORRELATION_ID, REQUEST_ID, USER_CONTEXT } from '../constants';

@Injectable()
export class RequestContextService {
  static readonly asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  // Initialize a new context for each request
  static run(callback: () => void) {
    const context = new Map<string, any>();
    this.asyncLocalStorage.run(context, callback);
  }

  // Set a specific key-value pair in the current context
  static set(key: string, value: any) {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(key, value);
    } else {
      Logger.error('AsyncLocalStorage is not available');
    }
  }

  // Get the value for a specific key from the current context
  static get<T>(key: string): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    return store?.get(key);
  }

  // static getRequestContext<T>(): T | undefined {
  //   return this.get<T>(REQUEST_CONTEXT);
  // }

  static getUserContext<T>(): T | undefined {
    return this.get<T>(USER_CONTEXT);
  }

  static getUserInfo(): { userId: string; userName: string } | undefined {
    const context = this.get<{ sid: string; name: string }>(USER_CONTEXT);
    return context ? { userId: context.sid, userName: context.name } : undefined;
  }

  static getRequestIds(): { correlationId: string, requestId: string } | undefined {
    return {
      correlationId: this.get<string>(CORRELATION_ID),
      requestId: this.get<string>(REQUEST_ID),
    }
  }
}
