import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SENTRY_OPTION } from '.';
import { SentryOptions } from './sentry-option.interface';

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  constructor(@Inject(SENTRY_OPTION) private readonly options: SentryOptions) {
    Sentry.init({
      dsn: this.options.sentryDsn,
      environment: this.options.environment,
    });
  }

  catch(exception: unknown, host: ArgumentsHost) {
    Logger.debug(this.constructor.name);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: (exception instanceof HttpException) ? exception.getResponse() : exception,
    };

    // Send exception to Sentry
    Sentry.captureException(exception);

    response.status(status).json(errorResponse);
  }
}