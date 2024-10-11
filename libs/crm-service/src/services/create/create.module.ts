import { Module } from '@nestjs/common';
import { CreateDetailsServiceV1, CreateServiceV1 } from './v1';
import { CreateDetailsServiceV2, CreateServiceV2 } from './v2';

const services = [
  CreateServiceV1, CreateDetailsServiceV1,
  CreateServiceV2, CreateDetailsServiceV2,
];

@Module({
  providers: [...services],
  exports: [...services],
})
export class CreateModule { }
