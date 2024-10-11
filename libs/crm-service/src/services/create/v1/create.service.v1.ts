import { Injectable } from '@nestjs/common';
import { CreateDetailsServiceV1 } from './create-details.service.v1';

@Injectable()
export class CreateServiceV1 {
  constructor(private detailsService: CreateDetailsServiceV1) {} // CreateDetailsService 주입

  execute() {
    return {
      name: 'Laptop',
      price: 1200,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
