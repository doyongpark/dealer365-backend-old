import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryDetailsService } from './query-details.service'; // QueryDetailsService 추가

@Module({
  providers: [QueryService, QueryDetailsService],
  exports: [QueryService], // QueryService만 내보내기
})
export class QueryModule {}
