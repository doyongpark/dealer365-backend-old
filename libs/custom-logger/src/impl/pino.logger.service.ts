import { LOGGER_OPTION } from '@dealer365-backend/shared';
import { Inject, Injectable } from '@nestjs/common';
import pino from 'pino';
import { CustomLoggerOptions } from '../custom-logger.option.interface';

@Injectable()
export class PinoLoggerService {
  private readonly logger: pino.Logger;

  constructor(@Inject(LOGGER_OPTION) private options: CustomLoggerOptions) {
    this.logger = pino({
      level: options?.level || 'info',
      formatters: {
        level: (label) => ({ level: label }),
      },
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
    this.logger.trace({ context, message });
  }
}