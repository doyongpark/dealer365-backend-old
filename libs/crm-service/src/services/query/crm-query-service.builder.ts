import { ENV_CONSTANT, EVENT_CONSTANT } from '@dealer365-backend/shared';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { QueryService } from './query.service';

@Injectable()
export class CrmQueryServiceBuilder {
  private service: any;
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private queryService: QueryService
  ) {
    this.service = this.queryService; // 기본 서비스 설정 (UserService로 초기화)
  }

  @OnEvent(EVENT_CONSTANT.CRM_SERVICE_CONFIG_CHANGED)
  handleConfigChange(services: { [key: string]: any }) {

    if (services[ENV_CONSTANT.QUERY_SERVICE]) {
      if (services[ENV_CONSTANT.QUERY_SERVICE] === 'QueryService') {
        this.service = this.queryService;
      }

      this.logger.log(`Service changed to: ${services[ENV_CONSTANT.QUERY_SERVICE]}`);
    }
  }

  execute() {
    this.logger.log(`Executing method from: ${this.service.constructor.name}`);
    return this.service.execute();
  }
}
