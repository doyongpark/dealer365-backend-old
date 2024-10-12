import { Module } from '@nestjs/common';
import { CreateDetailsService, CreateService } from './v1';
import { CreateDetailsServiceV2, CreateServiceV2 } from './v2';

const services = [
  CreateService, CreateDetailsService,
  CreateServiceV2, CreateDetailsServiceV2,
];

@Module({
  providers: [...services],
  exports: [...services],
})
export class CreateModule { }
