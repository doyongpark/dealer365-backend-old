import { Injectable } from '@nestjs/common';
import { UserDetailsService } from './user-details.service'; // UserDetailsService 임포트

@Injectable()
export class UserService {
  constructor(private userDetailsService: UserDetailsService) {} // UserDetailsService 주입

  execute() {
    return {
      name: 'John Doe',
      age: 30,
      details: this.userDetailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
