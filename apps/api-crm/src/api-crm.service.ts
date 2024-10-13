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
    console.log(this.quertService); // 주입된 인스턴스 확인
    console.log('instance type:', this.quertService.constructor.name); // 인스턴스 타입 확인

    return this.quertService.execute();
  }

  post(): string {
    console.log(this.createService); // 주입된 인스턴스 확인
    console.log('instance type:', this.createService.constructor.name); // 인스턴스 타입 확인

    return this.createService.execute();
  }

  put(): string {
    console.log(this.updateService); // 주입된 인스턴스 확인
    console.log('instance type:', this.updateService.constructor.name); // 인스턴스 타입 확인

    return this.updateService.execute();
  }

  delete(): string {
    console.log(this.deleteService); // 주입된 인스턴스 확인
    console.log('instance type:', this.deleteService.constructor.name); // 인스턴스 타입 확인

    return this.deleteService.execute();
  }
}
