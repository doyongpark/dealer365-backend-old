import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLoggerService } from './pino.logger.service';
import { WinstonLoggerService } from './winston.logger.service';
import { ConsoleLogger } from '@nestjs/common';
import { ENV_CONSTANT } from '@dealer365-backend/shared';

@Global()
@Module({})
export class CustomLoggerModule {
    static forRoot(): DynamicModule {
        return {
            module: CustomLoggerModule,
            providers: [
                {
                    provide: 'LOGGER',
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => {
                        const provider = configService.get<string>(ENV_CONSTANT.LOG_PROVIDER);
                        const level = configService.get<string>(ENV_CONSTANT.LOG_LEVEL, 'info');
                        const format = configService.get<string>(ENV_CONSTANT.LOG_FORMAT, 'json');
                        const logType = configService.get<string>(ENV_CONSTANT.LOG_TYPE, 'console');

                        if (provider === 'winston') {
                            return new WinstonLoggerService(level, format, logType);
                        } else if (provider === 'pino') {
                            return new PinoLoggerService(level, format, logType);
                        } else {
                            return new ConsoleLogger();  // 기본 NestJS 로거
                        }
                    },
                },
            ],
            exports: ['LOGGER'],
        };
    }
}
