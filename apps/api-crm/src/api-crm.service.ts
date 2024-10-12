import { ICreateService } from '@dealer365-backend/crm-service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiCrmService {
  constructor(private createService: ICreateService) {

  }
  getHello(): string {
    console.log(this.createService); // 주입된 인스턴스 확인
    console.log('createService instance type:', this.createService.constructor.name); // 인스턴스 타입 확인
    
    return this.createService.execute();
  }
}
