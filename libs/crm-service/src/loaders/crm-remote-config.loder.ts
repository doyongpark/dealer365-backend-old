import { API_SERVICE, CREATE_SERVICE, CRM_SERVICE_CONFIG_CHANGED, DELETE_SERVICE, QUERY_SERVICE, REMOTE_CONFIG_DATA, CONFIG_POLLING_PERIOD as REMOTE_CONFIG_POLLING_PERIOD, REMOTE_CONFIG_URL, UPDATE_SERVICE } from '@dealer365-backend/shared';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import axios from 'axios';
import { IApiService } from 'config';

@Injectable()
export class CrmRemoteConfigLoader implements OnModuleInit {
  private services: { [key: string]: any } = {};
  private readonly logger = new Logger(this.constructor.name);

  constructor(private configService: ConfigService, private eventEmitter: EventEmitter2) {

    const apiService = this.configService.get<IApiService>(API_SERVICE);

    // 초기 설정 읽기
    this.services[CREATE_SERVICE] = apiService.create;
    this.services[UPDATE_SERVICE] = apiService.update;
    this.services[DELETE_SERVICE] = apiService.delete;
    this.services[QUERY_SERVICE] = apiService.query;
  }

  async onModuleInit() {
    // 설정 업데이트를 위한 주기적 호출
    this.logger.log('RemoteConfigService initialized. Starting configuration updates...');
    this.updateConfig();
    setInterval(() => this.updateConfig(), REMOTE_CONFIG_POLLING_PERIOD);
  }

  private async updateConfig() {
    this.logger.log('Fetching remote configuration...');

    try {
      const remoteUrl = this.configService.get<string>(REMOTE_CONFIG_URL);

      const response = await axios.get(remoteUrl);

      this.logger.log(`Received new configuration: ${JSON.stringify(response.data)}`);

      if (response.data?.crm?.service) {

        this.configService.set(REMOTE_CONFIG_DATA, JSON.stringify(response.data));

        this.logger.log(`Configservice data: ${this.configService.get<string>(REMOTE_CONFIG_DATA)}`);

        const newServices = [
          { key: CREATE_SERVICE, data: response.data.crm.service.create },
          { key: UPDATE_SERVICE, data: response.data.crm.service.update },
          { key: DELETE_SERVICE, data: response.data.crm.service.delete },
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
            this.logger.log(`No changes detected in configuration: crm.${svc.key}`);
          }
        });

        if (isConfigChanged)
          this.eventEmitter.emit(CRM_SERVICE_CONFIG_CHANGED, this.services);
      }
    } catch (error) {
      this.logger.error('Failed to fetch remote configuration. Keeping current module.', error);
      this.logger.log(`Current module remains: ${JSON.stringify(this.services)}`);
    }
  }
}
