import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class WinstonLoggerService {
  private readonly logger: winston.Logger;

  constructor(level: string, format: string, logType: string) {
    this.logger = winston.createLogger({
      level: level,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, context }) => {
          const formattedMessage = typeof message === 'object' ? JSON.stringify(message) : message;
          return `[Winston] ${process.pid}   - ${timestamp}   [${context || 'Application'}] ${formattedMessage}`;
        }),
      ),
      defaultMeta: { logType: logType },
      transports: [
        new winston.transports.Console(),
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