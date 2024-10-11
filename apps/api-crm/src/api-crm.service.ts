import { CrmServiceBuilder } from '@dealer365-backend/crm-service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiCrmService {
  constructor(private readonly crmServiceBuilder: CrmServiceBuilder) {

  }
  getHello(): string {
    return this.crmServiceBuilder.executeMethod();
  }
}
