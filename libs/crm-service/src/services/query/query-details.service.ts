import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryDetailsService {
  getDetails() {
    return { address: '123 Main St', city: 'Anytown' }; // 사용자 상세 정보
  }
}
