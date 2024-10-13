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
function createServiceFactory(configService: ConfigService, ...injectedServices: any[]) {
  const configData = configService.get(ENV_CONSTANT.REMOTE_CONFIG_DATA);
  if (configData) {
    const serviceName = JSON.parse(configData)?.config?.crm?.service?.create?.toLowerCase();
    return getServiceByName(serviceName, injectedServices) || injectedServices.find(service => service instanceof CreateService);
  }
  return injectedServices.find(service => service instanceof CreateService);
}

// 서비스 이름으로 서비스를 찾는 함수
function getServiceByName(serviceName: string, services: any[]) {
  return services.find(service => service.constructor.name.toLowerCase() === serviceName);
}

@Module({
  providers: [
    ...services,
    {
      provide: ICreateService,
      useFactory: createServiceFactory,
      inject: [ConfigService, ...services],
      scope: Scope.REQUEST,
    },
  ],
  exports: [ICreateService],
})
export class CreateModule { }