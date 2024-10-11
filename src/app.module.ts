import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigurableModule } from './configurable.module';
import { DynamicController } from './dynamic.controller';
import { UserModule } from './user/user.module'; // UserModule 추가
import { ProductModule } from './product/product.module'; // ProductModule 추가

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigurableModule.register(), // 서비스 클래스 필요 없음
  ],
  controllers: [DynamicController],
  providers: [],
})
export class AppModule {}
