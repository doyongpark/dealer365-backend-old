import { CREATE_SERVICE, CRM_SERVICE_CONFIG_CHANGED } from '@dealer365-backend/shared';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DeleteService } from './delete.service';

@Injectable()
export class CrmDeleteServiceBuilder {
  private service: any;
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private deleteService: DeleteService
  ) {
    this.service = this.deleteService; // 기본 서비스 설정 (UserService로 초기화)
  }

  @OnEvent(CRM_SERVICE_CONFIG_CHANGED)
  handleConfigChange(services: { [key: string]: any }) {

    if (services[CREATE_SERVICE]) {
      if (services[CREATE_SERVICE] === 'DeleteService') {
        this.service = this.deleteService;
      }

      this.logger.log(`Service changed to: ${services[CREATE_SERVICE]}`);
    }
  }

  execute() {
    this.logger.log(`Executing method from: ${this.service.constructor.name}`);
    return this.service.execute();
  }
}
