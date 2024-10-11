import { CREATE_SERVICE, CRM_SERVICE_CONFIG_CHANGED } from '@dealer365-backend/shared';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UpdateService } from './update.service';

@Injectable()
export class CrmUpdateServiceBuilder {
  private service: any;
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private updateService: UpdateService
  ) {
    this.service = this.updateService; // 기본 서비스 설정 (UserService로 초기화)
  }

  @OnEvent(CRM_SERVICE_CONFIG_CHANGED)
  handleConfigChange(services: { [key: string]: any }) {

    if (services[CREATE_SERVICE]) {
      if (services[CREATE_SERVICE] === 'UpdateService') {
        this.service = this.updateService;
      }

      this.logger.log(`Service changed to: ${services[CREATE_SERVICE]}`);
    }
  }

  execute() {
    this.logger.log(`Executing method from: ${this.service.constructor.name}`);
    return this.service.execute();
  }
}
