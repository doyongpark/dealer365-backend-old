import { Module } from '@nestjs/common';
import { TestConfigService } from './test.config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { testConfiguration } from './test.configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],  // 환경 변수 파일 경로
      load: [testConfiguration]
    }),
  ],
  providers: [TestConfigService],
  exports: [TestConfigService],
})
export class TestConfigModule { }
