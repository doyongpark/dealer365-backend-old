import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDetailsService } from './product-details.service'; // ProductDetailsService 추가

@Module({
  providers: [ProductService, ProductDetailsService],
  exports: [ProductService], // ProductService만 내보내기
})
export class ProductModule {}
