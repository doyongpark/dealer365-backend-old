import { Injectable } from '@nestjs/common';
import { CreateDetailsService } from './create-details.service';

@Injectable()
export class CreateService {
  constructor(private detailsService: CreateDetailsService) {} // CreateDetailsService 주입

  execute() {
    return {
      name: 'Laptop',
      price: 1200,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
