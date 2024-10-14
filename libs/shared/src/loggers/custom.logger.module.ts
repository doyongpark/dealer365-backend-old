import { ENV_CONSTANT } from '@dealer365-backend/shared';
import { ConsoleLogger, DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLoggerService } from './pino.logger.service';
import { WinstonLoggerService } from './winston.logger.service';

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
                        const provider = configService.get<string>(ENV_CONSTANT.LOGGER_PROVIDER);
                        const level = configService.get<string>(ENV_CONSTANT.LOGGER_LEVEL);
                        const format = configService.get<string>(ENV_CONSTANT.LOGGER_FORMAT);
                        const logType = configService.get<string>(ENV_CONSTANT.LOGGER_TYPE);

                        if (provider.toLowerCase() === 'winston') {
                            return new WinstonLoggerService(level, format, logType);
                        } else if (provider.toLowerCase() === 'pino') {
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
