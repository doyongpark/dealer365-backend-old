// filter-config.interface.ts
export interface FilterModuleOptions {
  useSentryExceptionFilter?: boolean;
  sentryOptions?: SentryOptions; // Optional, only required if useSentryExceptionFilter is true
}

// sentry-options.interface.ts
export interface SentryOptions {
    sentryDsn: string;
    environment: string;
  }