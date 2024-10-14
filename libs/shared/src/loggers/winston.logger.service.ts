import { Injectable, LoggerService } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: Logger;

  constructor(level: string, logType: string, logFormat: string) {
    const loggerFormat = logFormat === 'json'
      ? format.json()  // JSON 형식으로 출력
      : format.combine(
          format.timestamp(),
          format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;  // 텍스트 형식으로 출력
          }),
        );

    const transportList = logType === 'file'
      ? [new transports.File({ filename: 'combined.log' })]
      : [new transports.Console()];  // 콘솔에 로그 출력

    this.logger = createLogger({
      level,
      format: loggerFormat,
      transports: transportList,
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
