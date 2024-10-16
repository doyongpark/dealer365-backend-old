// custom-logger-config.interface.ts
export interface CustomLoggerModuleOptions {
  provider?: 'winston' | 'pino';  // 예시 값
  level?: string;
  format?: string;
  logType?: string;
}