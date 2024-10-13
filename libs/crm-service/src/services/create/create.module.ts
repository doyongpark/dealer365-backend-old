import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateDetailsService, CreateService } from './v1'; // V1 서비스
import { CreateDetailsServiceV2, CreateServiceV2 } from './v2'; // V2 서비스
import { ICreateService } from './create.interface';
import { ENV_CONSTANT } from '@dealer365-backend/shared';

// 서비스 배열
const services = [
  CreateService,
  CreateServiceV2,
  CreateDetailsService,
  CreateDetailsServiceV2
];

// 팩토리 함수
function serviceFactory(configService: ConfigService, ...injectedServices: any[]) {
  const configData = configService.get(ENV_CONSTANT.REMOTE_CONFIG_DATA);
  const serviceName = configData ? JSON.parse(configData)?.config?.crm?.service?.create?.toLowerCase() : 'createservice';

  return injectedServices.find(service => service?.constructor?.name?.toLowerCase() === serviceName);
}

@Module({
  providers: [
    ...services,
    {
      provide: ICreateService,
      useFactory: serviceFactory,
      inject: [ConfigService, ...services],
      scope: Scope.REQUEST,
    },
  ],
  exports: [ICreateService],
})
export class CreateModule { }