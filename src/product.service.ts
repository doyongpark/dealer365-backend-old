import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  execute() { // 메서드 이름 수정
    return { name: 'Laptop', price: 1200 }; // 제품 정보
  }
}
