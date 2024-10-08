import { Module, Global } from '@nestjs/common';
import { Dealer365BackendTest2Service } from './test2.service';

@Global()
@Module({
  controllers: [],
  providers: [Dealer365BackendTest2Service],
  exports: [Dealer365BackendTest2Service],
})
export class Dealer365BackendTest2Module {}
