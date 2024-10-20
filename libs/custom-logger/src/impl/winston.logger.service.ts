import { LOGGER_OPTION } from '@dealer365-backend/shared';
import { Inject, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { LoggerOptions } from '../custom-logger.option.interface';

@Injectable()
export class WinstonLoggerService {
  private readonly logger: winston.Logger;

  constructor(@Inject(LOGGER_OPTION) private options: LoggerOptions) {
    this.logger = winston.createLogger({
      level: options?.level || 'info',
      format: winston.format[options?.format || 'json'](),
      transports: [
        new winston.transports.Console(),
        // Add other transports based on options.logType
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info({ context, message });
  }

  error(message: string, error?: Error, context?: string) {
    if (error) {
      this.logger.error({
        context,
        message,
        name: error.name,
        stack: error.stack,
        details: error.message,
      });
    } else {
      this.logger.error({ context, message });
    }
  }

  warn(message: string, context?: string) {
    this.logger.warn({ context, message });
  }

  debug(message: string, context?: string) {
    this.logger.debug({ context, message });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose({ context, message });
  }
}