import { SENTRY_OPTION, UserFriendlyException } from '@dealer365-backend/shared';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, Logger, NotFoundException } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Request, Response } from 'express';
import { SentryOptions } from './sentry-option.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(SENTRY_OPTION) private readonly options: SentryOptions) {
        if (options) {
            Sentry.init({
                dsn: this.options.sentryDsn,
                environment: this.options.environment,
            });
        }
    }

    private readonly common_msg = 'Oops! Something went wrong. We apologize for the inconvenience. There seems to be a temporary issue with our server, and we are unable to process your request at the moment.';
    catch(exception: HttpException, host: ArgumentsHost) {

        // Send exception to Sentry
        Sentry.captureException(exception);

        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const result = {
            status: status,
            success: [200, 201, 202].includes(status) ? true : false,
            error: {
                // code: '',//not used yet.
                message: exception instanceof UserFriendlyException ? exception.message : this.common_msg,
                details: {
                    originalUrl: request.originalUrl,
                    url: request.url,
                    baseUrl: request.baseUrl,
                    details: exception.stack,
                },
            },
        };

        Logger.error(result.error);

        if (this.options) {
            // Send exception to Sentry
            Sentry.captureException(exception);
        }


        //잘못 된 url로 요청 한 경우, 404응답 만 리턴하고 응답을 종료 
        if (exception instanceof NotFoundException && exception?.stack?.includes('routes-resolver')) {
            response.status(status).end();
        } else {
            response.status(status).json(result);
        }
    }
}