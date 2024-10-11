import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  execute() { // 메서드 이름 수정
    return { name: 'John Doe', age: 30 }; // 사용자 정보
  }
}
