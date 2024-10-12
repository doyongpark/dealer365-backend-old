// import { REMOTE_CONFIG_DATA, REMOTE_CONFIG_DATA_VERSION, REMOTE_CONFIG_URL } from '@dealer365-backend/shared';
// import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
// import { ConfigService as NestConfigService } from '@nestjs/config';
// import axios from 'axios';

// @Injectable()
// export class ConfigService extends NestConfigService implements OnModuleInit {
//   private readonly logger = new Logger(ConfigService.name);

//   constructor() {
//     super();
//   }

//   async onModuleInit() {
//     await this.fetchRemoteConfig();  // 초기 설정 로드
//     this.startConfigPolling();  // 주기적으로 설정 가져오기
//   }

//   private async fetchRemoteConfig() {
//     try {
//       this.logger.log(`RemoteUrl: ${this.get(REMOTE_CONFIG_URL)}`);
//       const response = await axios.get('http://localhost:3001/config');
//       if (response.status === 200) {
//         this.setConfig(response.data);
//         this.logger.log(`Config updated: ${JSON.stringify(response.data)}`);
//       } else {
//         this.logger.error(`Failed to fetch config. Status: ${response.status}`);
//       }
//     } catch (error) {
//       this.logger.error(`Error fetching remote config: ${error.message}`);
//     }
//   }

//   private setConfig(data: any) {
//     // 여기서 원격 데이터를 처리하여 ConfigService에 적용합니다.
//     // 예: this.config.data = data;
//     const configDataVersion = this.get<number>(REMOTE_CONFIG_DATA_VERSION);
//     this.set(REMOTE_CONFIG_DATA, JSON.stringify(data));
//   }

//   private startConfigPolling() {
//     setInterval(async () => {
//       await this.fetchRemoteConfig();
//     }, 30000);  // 30초마다 설정 갱신
//   }
// }
