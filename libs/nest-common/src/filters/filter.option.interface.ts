import { SentryOptions } from "./impl";

export interface FilterModuleOptions {
  useSentryExceptionFilter?: boolean;
  sentryOptions?: SentryOptions;
}