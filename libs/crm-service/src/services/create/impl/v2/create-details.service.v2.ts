import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateDetailsServiceV2 {
  getDetails() {
    return { manufacturer: 'Brand A', warranty: '2 years' }; // 제품 상세 정보
  }
}
