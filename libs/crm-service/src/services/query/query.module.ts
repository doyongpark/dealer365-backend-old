import { ENV_CONSTANT } from '@dealer365-backend/shared';
import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IQueryService } from './query.interface';
import { QueryDetailsService, QueryService } from './impl';

// 서비스 배열
const services = [
  QueryService,
  QueryDetailsService,
];

// 팩토리 함수
function serviceFactory(configService: ConfigService, ...injectedServices: any[]) {
  const configData = configService.get(ENV_CONSTANT.REMOTE_CONFIG_DATA);
  const serviceName = configData ? JSON.parse(configData)?.config?.crm?.service?.query : 'QueryService';

  return injectedServices.find(service => service?.constructor?.name?.toLowerCase() === serviceName?.toLowerCase());
}

@Module({
  providers: [
    ...services,
    {
      provide: IQueryService,
      useFactory: serviceFactory,
      inject: [ConfigService, ...services],
      scope: Scope.REQUEST,
    },
  ],
  exports: [IQueryService],
})
export class QueryModule { }