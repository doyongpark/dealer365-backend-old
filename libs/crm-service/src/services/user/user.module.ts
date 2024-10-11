import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetailsService } from './user-details.service'; // UserDetailsService 추가

@Module({
  providers: [UserService, UserDetailsService],
  exports: [UserService], // UserService만 내보내기
})
export class UserModule {}
