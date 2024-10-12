import { IConfig } from '@dealer365-backend/config';
import { APP_CONSTANT, ENV_CONSTANT, EVENT_CONSTANT } from '@dealer365-backend/shared';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CrmRemoteConfigLoader implements OnModuleInit {
  private services: { [key: string]: any } = {};
  private readonly logger = new Logger(this.constructor.name);

  constructor(private configService: ConfigService, private eventEmitter: EventEmitter2) {
  }

  async onModuleInit() {
    // 설정 업데이트를 위한 주기적 호출
    this.logger.log('RemoteConfigService initialized. Starting configuration updates...');
    setInterval(() => this.updateConfig(), APP_CONSTANT.LOCAL_CONFIG_CHECKING_PERIOD);
  }

  private async updateConfig() {
    this.logger.log('Checking configuration...');

    try {
      const currentConfigVersion = this.configService.get<number>(ENV_CONSTANT.CONFIG_VERSION);
      const config = this.configService.get<IConfig>(ENV_CONSTANT.REMOTE_CONFIG);

      if (config?.data) {

        this.logger.log(`Configservice data: ${JSON.stringify(config.data)}`);

        const remoteConfigData = JSON.parse(config.data);
        const remoteConfigVersion = remoteConfigData.version as number;


        if (currentConfigVersion < remoteConfigVersion) {

          const newServices = [
            { key: ENV_CONSTANT.CREATE_SERVICE, data: remoteConfigData.service.create },
            { key: ENV_CONSTANT.UPDATE_SERVICE, data: remoteConfigData.service.update },
            { key: ENV_CONSTANT.DELETE_SERVICE, data: remoteConfigData.service.delete },
            { key: ENV_CONSTANT.QUERY_SERVICE, data: remoteConfigData.service.query }
          ];

          let isConfigChanged = false;
          newServices.forEach(svc => {
            if (svc.data && this.services[svc.key] !== svc.data) {
              this.logger.warn(`Configuration changed detected! Old module: ${this.services[svc.key]}, New module: ${svc.data}`);

              this.services[svc.key] = svc.data;
              this.logger.log(`Configuration updated: ${this.services[svc.key]}`);

              if (!isConfigChanged)
                isConfigChanged = true;
            } else {
              this.logger.log(`No changes detected in configuration: crm.${svc.key}`);
            }
          });

          if (isConfigChanged)
            this.eventEmitter.emit(EVENT_CONSTANT.CRM_SERVICE_CONFIG_CHANGED, this.services);
        }
      }

    } catch (error) {
      this.logger.error('Failed to fetch remote configuration. Keeping current module.', error);
      this.logger.log(`Current module remains: ${JSON.stringify(this.services)}`);
    }
  }
}
