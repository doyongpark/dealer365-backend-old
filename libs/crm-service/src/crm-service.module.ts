import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CrmServiceDynamicModule } from './crm-service.dynamic.module';

@Module({
  imports: [CrmServiceDynamicModule.register()],
  providers: [ConfigService, EventEmitter2],  
  exports: [CrmServiceDynamicModule],
})
export class CrmServiceModule { }
