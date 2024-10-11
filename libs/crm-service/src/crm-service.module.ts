import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CrmDynamicServiceModule } from './crm-dynamic-service.module';

@Module({
  imports: [CrmDynamicServiceModule.register()],
  providers: [ConfigService, EventEmitter2],  
  exports: [CrmDynamicServiceModule],
})
export class CrmServiceModule { }
