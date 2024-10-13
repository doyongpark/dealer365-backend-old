import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateModule } from './services';

const subModules = [CreateModule];

@Module({
  imports: [...subModules],
  providers: [EventEmitter2],
  exports: [...subModules],
})
export class CrmServiceModule { }
