import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RemoteConfigService implements OnModuleInit {
  private currentModule: string;
  private readonly logger = new Logger(RemoteConfigService.name);

  constructor(private configService: ConfigService, private eventEmitter: EventEmitter2) {
    // 초기 설정 읽기
    this.currentModule = this.configService.get<string>('DEFAULT_MODULE') || 'defaultModule';
    this.logger.log(`Initial module loaded: ${this.currentModule}`);
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
      const response = await axios.get('http://localhost:3001/config');
      const newModule = response.data.module;

      this.logger.log(`Received new configuration: ${JSON.stringify(response.data)}`);

      if (newModule !== this.currentModule) {
        this.logger.warn(`Configuration changed detected! Old module: ${this.currentModule}, New module: ${newModule}`);
        this.currentModule = newModule;
        this.eventEmitter.emit('config.changed', this.currentModule);
        this.logger.log(`Configuration updated: ${this.currentModule}`);
      } else {
        this.logger.log('No changes detected in configuration.');
      }
    } catch (error) {
      this.logger.error('Failed to fetch remote configuration. Keeping current module.', error);
      this.logger.log(`Current module remains: ${this.currentModule}`);
    }
  }

  getCurrentModule() {
    this.logger.log(`Returning current module: ${this.currentModule}`);
    return this.currentModule;
  }
}
