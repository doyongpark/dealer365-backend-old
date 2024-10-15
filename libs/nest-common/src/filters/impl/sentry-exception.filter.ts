import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SentryOptions } from '../filter-config.interface';

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  constructor(@Inject('SENTRY_OPTIONS') private readonly options: SentryOptions) {
    Sentry.init({
      dsn: this.options.sentryDsn,
      environment: this.options.environment,
    });
  }

  catch(exception: unknown, host: ArgumentsHost) {
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