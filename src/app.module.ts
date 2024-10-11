import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from './config/config.service';
import { ConfigurableModule } from './config/configurable.module';

@Module({
  imports: [HttpModule],
  providers: [ConfigService],
})
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // ConfigurableModule의 동적 모듈 인스턴스 생성
    ConfigurableModule.register(this.configService);
  }
}
