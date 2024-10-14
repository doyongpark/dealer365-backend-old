import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApiCrmService } from '../../api-crm.service';
import { GetCrmDocsQuery } from '../impl/get-crm-docs.query';

@QueryHandler(GetCrmDocsQuery)
export class GetCrmDocsHandler implements IQueryHandler<GetCrmDocsQuery> {

  constructor(private readonly apiCrmService: ApiCrmService) { }

  async execute(query: GetCrmDocsQuery) {
    return await this.apiCrmService.get();
  }
}
