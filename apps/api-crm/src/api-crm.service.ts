
import { ILeadService } from '@daler365-backend/package-crm';
import { Injectable } from '@nestjs/common';
import { filter } from 'rxjs';

@Injectable()
export class ApiCrmService {
  constructor(private readonly leadService: ILeadService) {

  }
  async get(filter?: any) {
    return await this.leadService.search(filter);
  }

  async post() {
    return 'PostCrmDocsCommand...';
  }

  async put() {
    return 'PutCrmDocsCommand...';
  }

  async delete() {
    return 'DeleteCrmDocsCommand...';
  }
}
