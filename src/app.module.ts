import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigurableModule } from './configurable.module';
import { DynamicController } from './dynamic.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // ConfigModule 추가
    EventEmitterModule.forRoot(),
    ConfigurableModule.register(UserService),
  ],
  controllers: [DynamicController],
  providers: [],
})
export class AppModule {}
