// shared-module-options.interface.ts
import { CustomLoggerModuleOptions } from "./loggers/custom-logger-config.interface";

export interface SharedModuleOptions {
  loggerOptions?: CustomLoggerModuleOptions;
}