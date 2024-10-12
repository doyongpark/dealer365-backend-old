import { IConfig } from '@dealer365-backend/config';
import { ENV_CONSTANT } from '@dealer365-backend/shared';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateService } from './v1';
import { CreateServiceV2 } from './v2';

@Injectable({ scope: Scope.REQUEST })
export class CrmCreateServiceBuilder {
  private service: any;
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly configService: ConfigService,
    private readonly createService: CreateService,
    private readonly createServiceV2: CreateServiceV2
  ) {

    this.service = this.createService; // 기본 서비스 설정 (UserService로 초기화)

    const config = this.configService.get<IConfig>(ENV_CONSTANT.REMOTE_CONFIG);
    this.logger.log(`Configservice data: ${JSON.stringify(config.data)}`);
    if (config?.data) {
      const remoteConfigData = JSON.parse(config.data);
      const serviceName = remoteConfigData.crm?.service?.create;
      if (serviceName === 'CreateServiceV2') {
        this.service = this.createServiceV2; // 기본 서비스 설정 (UserService로 초기화)
      }
    }
  }

  execute() {
    this.logger.log(`Executing method from: ${this.service.constructor.name}`);
    return this.service.execute();
  }
}
