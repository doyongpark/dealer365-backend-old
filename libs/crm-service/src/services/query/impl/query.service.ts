import { Injectable } from '@nestjs/common';
import { IQueryService } from '../query.interface';
import { QueryDetailsService } from './query-details.service';

@Injectable()
export class QueryService implements IQueryService {
  constructor(private detailsService: QueryDetailsService) { } // QueryDetailsService 주입

  execute(): any {
    return {
      name: 'Laptop',
      price: 1200,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
