import { Injectable, Scope } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { APP_CONSTANT } from "../../../../shared/src/constants";


@Injectable({ scope: Scope.REQUEST })
export class UserContextService {
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
      store.set(APP_CONSTANT.USER_CONTEXT_KEY, value);
    }
  }

  // Get a value from the current context
  static get<T>(): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      return store.get(APP_CONSTANT.USER_CONTEXT_KEY);
    }
    return undefined;
  }

  static getUserContext<T>(): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      return store.get(APP_CONSTANT.USER_CONTEXT_KEY) as T;
    }
    return undefined;
  }

}