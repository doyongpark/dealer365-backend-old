import { Module } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";

@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage<Map<string, any>>(),
    },
  ],
  exports: [AsyncLocalStorage],
})
export class AsyncLocalStorageModule { }
