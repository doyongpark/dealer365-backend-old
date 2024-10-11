import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import axios from 'axios';

@Injectable()
export class CrmDynamicConfigService implements OnModuleInit {
  private currentService: string;
  private readonly logger = new Logger(this.constructor.name);

  constructor(private configService: ConfigService, private eventEmitter: EventEmitter2) {
    // 초기 설정 읽기
    this.currentService = this.configService.get<string>('DEFAULT_CRM_SERVICE_NAME') || 'defaultModule';
    this.logger.log(`Initial module loaded: ${this.currentService}`);
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
      const response = await axios.get(this.configService.get<string>('REMOTE_CONFIG_SERVER_URL'));
      const newModule = response.data.module;

      this.logger.log(`Received new configuration: ${JSON.stringify(response.data)}`);

      if (newModule !== this.currentService) {
        this.logger.warn(`Configuration changed detected! Old module: ${this.currentService}, New module: ${newModule}`);
        this.currentService = newModule;
        this.eventEmitter.emit('config.changed', this.currentService);
        this.logger.log(`Configuration updated: ${this.currentService}`);
      } else {
        this.logger.log('No changes detected in configuration.');
      }
    } catch (error) {
      this.logger.error('Failed to fetch remote configuration. Keeping current module.', error);
      this.logger.log(`Current module remains: ${this.currentService}`);
    }
  }

  getcurrentService() {
    this.logger.log(`Returning current module: ${this.currentService}`);
    return this.currentService;
  }
}
