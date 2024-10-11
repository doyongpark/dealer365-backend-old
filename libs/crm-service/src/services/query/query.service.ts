import { Injectable } from '@nestjs/common';
import { QueryDetailsService } from './query-details.service'; // QueryDetailsService 임포트

@Injectable()
export class QueryService {
  constructor(private detailsService: QueryDetailsService) {} // QueryDetailsService 주입

  execute() {
    return {
      name: 'John Doe',
      age: 30,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
