import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateModule, DeleteModule, QueryModule, UpdateModule } from './services';

const subModules = [CreateModule, UpdateModule, DeleteModule, QueryModule];

@Module({
  imports: [...subModules],
  providers: [EventEmitter2],
  exports: [...subModules],
})
export class CrmServiceModule { }
