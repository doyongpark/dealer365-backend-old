import { Module } from '@nestjs/common';
import { UpdateService } from './update.service';
import { UpdateDetailsService } from './update-details.service'; // UpdateDetailsService 추가

@Module({
  providers: [UpdateService, UpdateDetailsService],
  exports: [UpdateService], // UpdateService만 내보내기
})
export class UpdateModule {}
