import { Injectable, LoggerService } from '@nestjs/common';
import pino from 'pino';

@Injectable()
export class PinoLoggerService implements LoggerService {
  private logger;

  constructor(level: string, logType: string, logFormat: string) {
    const options: pino.LoggerOptions = {
      level,
      formatters: {
        level(label) {
          return { level: label };  // 로그 레벨 포맷팅
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      redact: {
        paths: ['password', 'email', 'credit','card'],  // 민감 정보 마스킹
        censor: '***',  // 마스킹할 내용
      },
      transport: logType === 'file' ? undefined : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    };

    // JSON 형식으로 출력할 경우 transport를 설정하지 않음
    if (logFormat === 'json') {
      delete options.transport;
    }

    this.logger = pino(options);
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error({ err: trace }, message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.info(message);  // pino에는 verbose가 없으므로 info로 처리
  }
}
