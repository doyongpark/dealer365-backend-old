import { Injectable } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service'; // ProductDetailsService 임포트

@Injectable()
export class ProductService {
  constructor(private productDetailsService: ProductDetailsService) {} // ProductDetailsService 주입

  execute() {
    return {
      name: 'Laptop',
      price: 1200,
      details: this.productDetailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
