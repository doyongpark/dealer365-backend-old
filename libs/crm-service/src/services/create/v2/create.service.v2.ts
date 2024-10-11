import { Injectable } from '@nestjs/common';
import { CreateDetailsServiceV2 } from './create-details.service.v2';

@Injectable()
export class CreateServiceV2 {
  constructor(private detailsService: CreateDetailsServiceV2) {} // CreateDetailsService 주입

  execute() {
    return {
      name: 'Laptop',
      price: 1200,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
