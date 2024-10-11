import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDetailsService {
  getDetails() {
    return { address: '123 Main St', city: 'Anytown' }; // 사용자 상세 정보
  }
}
