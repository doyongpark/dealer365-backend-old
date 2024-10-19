import { USER_CONTEXT } from "@dealer365-backend/shared";
import { Injectable, Scope } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";

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
      store.set(USER_CONTEXT, value);
    }
  }

  // Get a value from the current context
  static get<T>(): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      return store.get(USER_CONTEXT);
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

  static getUserInfo(): { userId: string, userName: string } | undefined {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      const context = store.get(USER_CONTEXT);
      if (context)
        return {
          userId: context.sid, userName: context.name
        }
    }

    return undefined;
  }

}