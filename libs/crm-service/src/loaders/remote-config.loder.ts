import { CREATE_SERVICE, CRM_SERVICE_CONFIG_CHANGED, DELETE_SERVICE, QUERY_SERVICE, UPDATE_SERVICE } from '@dealer365-backend/shared';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import axios from 'axios';

@Injectable()
export class RemoteConfigLoader implements OnModuleInit {
  private services: { [key: string]: any } = {};
  private readonly logger = new Logger(this.constructor.name);

  constructor(private configService: ConfigService, private eventEmitter: EventEmitter2) {
    // 초기 설정 읽기
    this.services[CREATE_SERVICE] = this.configService.get<string>(CREATE_SERVICE);
    this.services[UPDATE_SERVICE] = this.configService.get<string>(UPDATE_SERVICE);
    this.services[DELETE_SERVICE] = this.configService.get<string>(DELETE_SERVICE);
    this.services[QUERY_SERVICE] = this.configService.get<string>(QUERY_SERVICE);

    this.logger.log(`Initial services loaded: ${this.services}`);
  }

  async onModuleInit() {
    // 설정 업데이트를 위한 주기적 호출
    this.logger.log('RemoteConfigService initialized. Starting configuration updates...');
    this.updateConfig();
    setInterval(() => this.updateConfig(), 5000); // 5초마다 호출
  }

  private async updateConfig() {
    this.logger.log('Fetching remote configuration...');

    try {
      const response = await axios.get(this.configService.get<string>('remote'));

      this.logger.log(`Received new configuration: ${JSON.stringify(response.data)}`);

      if (response.data?.crm?.service) {
        const newServices = [
          { key: CREATE_SERVICE, data: response.data.crm.service.create },
          { key: UPDATE_SERVICE, data: response.data.crm.service.delete },
          { key: DELETE_SERVICE, data: response.data.crm.service.update },
          { key: QUERY_SERVICE, data: response.data.crm.service.query }
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
            this.logger.log('No changes detected in configuration.');
          }
        });

        if (isConfigChanged)
          this.eventEmitter.emit(CRM_SERVICE_CONFIG_CHANGED, this.services);
      }
    } catch (error) {
      this.logger.error('Failed to fetch remote configuration. Keeping current module.', error);
      this.logger.log(`Current module remains: ${this.services}`);
    }
  }
}
