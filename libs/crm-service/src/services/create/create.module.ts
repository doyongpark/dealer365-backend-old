import { ENV_CONSTANT } from '@dealer365-backend/shared';
import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICreateService } from './create.interface';
import { CreateDetailsService, CreateService } from './v1'; // V1 서비스
import { CreateDetailsServiceV2, CreateServiceV2 } from './v2'; // V2 서비스

// 팩토리 함수
function serviceFactory(configService: ConfigService, ...injectedServices: any[]) {
  console.log('ConfigService:', configService);
  console.log('Injected Services:', injectedServices);

  const configData = configService.get(ENV_CONSTANT.REMOTE_CONFIG_DATA);
  console.log('Config Data:', configData);

  if (configData) {
    const serviceName = JSON.parse(configData)?.config?.crm?.service?.create?.toLowerCase();
    console.log('Service Name:', serviceName);

    const service = getServiceByName(serviceName, injectedServices);
    console.log('Selected Service:', service);

    if (service) {
      return service;
    }
  }

  let defaultService;
  for (const service of injectedServices) {
    console.log('Checking Service:', service);
    console.log('Service Name:', service?.constructor?.name);
    if (service?.constructor?.name?.toLowerCase() === 'createservice') {
      defaultService = service;
      break;
    }
  }
  console.log('Default Service:', defaultService);
  return defaultService;
}

// 서비스 이름으로 서비스를 찾는 함수
function getServiceByName(serviceName: string, services: any[]) {
  console.log('Finding Service:', serviceName);
  const service = services.find(service => service?.constructor?.name?.toLowerCase() === serviceName);
  console.log('Found Service:', service);
  return service;
}

// 서비스 배열
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
      useFactory: serviceFactory,
      inject: [ConfigService, ...services],
      scope: Scope.REQUEST,
    },
  ],
  exports: [ICreateService],
})
export class CreateModule { }