import { ICreateService, IDeleteService, IQueryService, IUpdateService } from '@dealer365-backend/crm-service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiCrmService {
  constructor(private createService: ICreateService,
    private updateService: IUpdateService,
    private deleteService: IDeleteService,
    private quertService: IQueryService
  ) {

  }
  get(): string {
    return this.quertService.execute();
  }

  post(): string {
    return this.createService.execute();
  }

  put(): string {
    return this.updateService.execute();
  }

  delete(): string {
    return this.deleteService.execute();
  }
}
