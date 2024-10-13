import { ENV_CONSTANT } from '@dealer365-backend/shared';
import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICreateService } from './create.interface';
import { CreateDetailsService, CreateDetailsServiceV2, CreateService, CreateServiceV2 } from './impl';

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