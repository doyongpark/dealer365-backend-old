import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProviderModule } from './services/provider.module';

@Module({
  imports: [ProviderModule.register()],
  providers: [ConfigService, EventEmitter2],  
  exports: [ProviderModule],
})
export class CrmServiceModule { }
