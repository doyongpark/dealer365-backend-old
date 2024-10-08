import { Module, Global } from '@nestjs/common';
import { Dealer365BackendTest1Service } from './test1.service';

@Global()
@Module({
  controllers: [],
  providers: [Dealer365BackendTest1Service],
  exports: [Dealer365BackendTest1Service],
})
export class Dealer365BackendTest1Module {}
