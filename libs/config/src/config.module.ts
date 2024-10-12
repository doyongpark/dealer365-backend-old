import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
// import { ConfigService } from './config.service'; // 커스텀 ConfigService
import { configuration } from './configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,  // 글로벌하게 ConfigService를 사용하도록 설정
      envFilePath: ['.env'],  // 경로 설정
      load: [configuration]
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
