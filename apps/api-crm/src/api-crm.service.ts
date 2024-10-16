
import { ILeadService } from '@dealer365-backend/package-crm';
import { Injectable } from '@nestjs/common';

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
