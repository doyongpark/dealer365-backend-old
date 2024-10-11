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
    this.updateConfig();
    setInterval(() => this.updateConfig(), 5000); // 5초마다 호출
  }

  private async updateConfig() {
    try {
      const response = await axios.get('http://localhost:3001/config');
      const newModule = response.data.module;

      if (newModule !== this.currentModule) {
        this.currentModule = newModule;
        this.eventEmitter.emit('config.changed', this.currentModule);
        this.logger.log(`Configuration updated: ${this.currentModule}`);
      }
    } catch (error) {
      this.logger.error('Failed to fetch remote configuration. Keeping current module.', error);
      this.logger.log(`Current module remains: ${this.currentModule}`);
    }
  }

  getCurrentModule() {
    return this.currentModule;
  }
}
