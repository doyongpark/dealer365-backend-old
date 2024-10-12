import { ConfigModule } from '@dealer365-backend/config';
import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CrmServiceDynamicModule } from './crm-service.dynamic.module';

@Module({
  imports: [ConfigModule, CrmServiceDynamicModule.register()],
  providers: [EventEmitter2],
  exports: [CrmServiceDynamicModule],
})
export class CrmServiceModule { }
