import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, interval, switchMap } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ConfigService implements OnModuleInit {
  private config: any;
  private logger = new Logger(ConfigService.name);
  private configUrl = 'http://localhost:3001/config';

  constructor(private httpService: HttpService) {}

  async onModuleInit() {
    await this.loadConfig();

    // 30초마다 config 정보를 업데이트
    interval(30000)
      .pipe(switchMap(() => this.loadConfig().catch(() => this.config)))
      .subscribe(newConfig => {
        this.config = newConfig;
        this.logger.log('Config updated: ' + JSON.stringify(this.config));
      });
  }

  private async loadConfig() {
    try {
      const response = await firstValueFrom(this.httpService.get(this.configUrl));
      this.config = response.data;
      this.logger.log('Loaded config: ' + JSON.stringify(this.config));
      return this.config;
    } catch (error) {
      this.logger.error('Failed to load config: ' + error.message);
      return this.config; // 이전 config 유지
    }
  }

  get module() {
    return this.config?.module;
  }
}
