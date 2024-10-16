import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ConfigService extends NestConfigService implements OnModuleInit {
  private remoteConfigUrl: string;

  constructor() {
    super();
  }

  async onModuleInit() {
    Logger.debug('Initializing ConfigService...');

    // 환경 변수에서 원격 URL 가져오기
    this.remoteConfigUrl = this.get<string>('REMOTE_CONFIG_URL');

    await this.loadInitialConfig();  // 초기 설정 로드
    this.startConfigPolling();  // 주기적으로 설정 가져오기
  }

  private async loadInitialConfig() {
    Logger.debug(`Loading initial config from ${this.remoteConfigUrl}`);
    try {
      const response = await axios.get(this.remoteConfigUrl);
      if (response.status === 200) {
        this.setConfig(response.data);
      } else {
        Logger.error(`Failed to load initial config, status: ${response.status}`);
      }
    } catch (error) {
      Logger.error(`Error loading initial config: ${error.message}`, error.stack);
    }
  }

  private async fetchRemoteConfig() {
    Logger.debug(`Fetching remote config from ${this.remoteConfigUrl}`);
    try {
      const response = await axios.get(this.remoteConfigUrl);
      if (response.status === 200) {
        this.setConfig(response.data);
      } else {
        Logger.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      Logger.error(`Failed to fetch remote config: ${error.message}`, error.stack);
    }
  }

  private setConfig(data: any) {
    if (data) {
      const remoteConfigVersion = this.get<number>('REMOTE_CONFIG_VERSION') || this.get<number>('REMOTE_CONFIG_VERSION');
      const newRemoteConfigVersion = data.version as number;

      if (!remoteConfigVersion || remoteConfigVersion < newRemoteConfigVersion) {

        this.set('REMOTE_CONFIG_VERSION', newRemoteConfigVersion);
        this.set('REMOTE_CONFIG_DATA', JSON.stringify(data));
        Logger.debug(`Config updated successfully: ${JSON.stringify(data)}`);
      }
    }
  }

  private startConfigPolling() {
    Logger.debug(`Starting config polling every ${10000} seconds.`);
    setInterval(async () => {
      Logger.debug('Polling for updated config...');
      await this.fetchRemoteConfig();
    }, 10000);
  }
}
