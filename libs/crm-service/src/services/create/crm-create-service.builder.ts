import { CREATE_SERVICE, CRM_SERVICE_CONFIG_CHANGED } from '@dealer365-backend/shared';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateServiceV1 } from './v1';
import { CreateServiceV2 } from './v2';

@Injectable()
export class CrmCreateServiceBuilder {
  private service: any;
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private createServiceV1: CreateServiceV1,
    private createServiceV2: CreateServiceV2
  ) {
    this.service = this.createServiceV1; // 기본 서비스 설정 (UserService로 초기화)
  }

  @OnEvent(CRM_SERVICE_CONFIG_CHANGED)
  handleConfigChange(services: { [key: string]: any }) {

    if (services[CREATE_SERVICE]) {
      if (services[CREATE_SERVICE] === 'CreateServiceV1') {
        this.service = this.createServiceV1;
      } else if (services[CREATE_SERVICE] === 'CreateServiceV2') {
        this.service = this.createServiceV2;
      }

      this.logger.log(`Service changed to: ${services[CREATE_SERVICE]}`);
    }
  }

  execute() {
    this.logger.log(`Executing method from: ${this.service.constructor.name}`);
    return this.service.execute();
  }
}
