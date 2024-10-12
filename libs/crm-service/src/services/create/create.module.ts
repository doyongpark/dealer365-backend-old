import { ENV_CONSTANT } from '@dealer365-backend/shared';
import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICreateService } from './create.interface';
import { CreateDetailsService, CreateService } from './v1'; // V1 서비스
import { CreateDetailsServiceV2, CreateServiceV2 } from './v2'; // V2 서비스

const services = [
  CreateService,
  CreateServiceV2,
  CreateDetailsService,
  CreateDetailsServiceV2
];

@Module({
  providers: [
    ...services,
    {
      provide: ICreateService,
      useFactory: (configService: ConfigService, defaultService: CreateService, serviceV2: CreateServiceV2) => {
        const configData = configService.get(ENV_CONSTANT.REMOTE_CONFIG_DATA);
        if (configData) {
          const serviceName = JSON.parse(configData)?.config?.crm?.service?.create;
          return serviceName && serviceName.toLowerCase() === 'createservicev2' ? serviceV2 : defaultService;
        }
        return defaultService;
      },
      inject: [ConfigService, ...services],
      scope: Scope.REQUEST,
    },
  ],
  exports: [ICreateService],
})
export class CreateModule { }
