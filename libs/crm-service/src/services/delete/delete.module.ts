import { Module } from '@nestjs/common';
import { DeleteService } from './delete.service';
import { DeleteDetailsService } from './delete-details.service'; // DeleteDetailsService 추가

@Module({
  providers: [DeleteService, DeleteDetailsService],
  exports: [DeleteService], // DeleteService만 내보내기
})
export class DeleteModule {}
