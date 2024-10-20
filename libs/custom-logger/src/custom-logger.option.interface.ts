export interface CustomLoggerModuleOptions {
  provider?: string;
  loggerOptions?: CustomLoggerOptions;
}

export interface CustomLoggerOptions {
  level?: string;
  format?: string;
  logType?: string;
}