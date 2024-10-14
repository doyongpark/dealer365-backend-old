import { Injectable } from '@nestjs/common';
import pino from 'pino';
import * as pretty from 'pino-pretty';

@Injectable()
export class PinoLoggerService {
  private readonly logger: pino.Logger;

  constructor(level: string, format: string, logType: string) {
    const prettyStream = pretty({
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
      messageFormat: (log, message) => {
        const timestamp = new Date().toISOString();
        const formattedMessage = typeof message === 'object' ? JSON.stringify(message) : message;
        return `[Pino] ${process.pid}   - ${timestamp}   [${log.context || 'Application'}] ${formattedMessage}`;
      },
    });

    this.logger = pino({
      level: level,
      base: { logType: logType },
      transport: format === 'pretty' ? { target: 'pino-pretty' } : undefined,
    }, prettyStream);
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