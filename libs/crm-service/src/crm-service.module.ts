import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceProviderModule } from './crm-service.provider.module';

@Module({
  imports: [ServiceProviderModule.register()],
  providers: [ConfigService, EventEmitter2],  
  exports: [ServiceProviderModule],
})
export class CrmServiceModule { }
