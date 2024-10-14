import { Module } from '@nestjs/common';
import { CreateModule, DeleteModule, QueryModule, UpdateModule } from './services';

const subModules = [CreateModule, UpdateModule, DeleteModule, QueryModule];

@Module({
  imports: [...subModules],
  providers: [],
  exports: [...subModules],
})
export class CrmServiceModule { }
