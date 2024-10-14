import { ICreateService, IDeleteService, IQueryService, IUpdateService } from '@dealer365-backend/crm-service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ApiCrmService {
  constructor(private readonly createService: ICreateService,
    private readonly updateService: IUpdateService,
    private readonly deleteService: IDeleteService,
    private readonly queryService: IQueryService
  ) {

  }
  async get() {
    Logger.log(`GetCrmDocsQuery...${this.queryService}`);
    return await this.queryService.execute();
  }

  async post() {
    return await this.createService.execute();
  }

  async put() {
    return await this.updateService.execute();
  }

  async delete() {
    return await this.deleteService.execute();
  }
}
