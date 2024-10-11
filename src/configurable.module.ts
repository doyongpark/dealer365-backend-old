import { Module, DynamicModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DynamicService } from './dynamic.service';
import { RemoteConfigService } from './remote-config.service'; // RemoteConfigService import 추가
import { ConfigModule } from '@nestjs/config'; // ConfigModule import 추가

@Module({})
export class ConfigurableModule {
  static register(service: any): DynamicModule {
    return {
      module: ConfigurableModule,
      imports: [
        EventEmitterModule.forRoot(), // EventEmitter 모듈 임포트
        ConfigModule.forRoot(), // ConfigModule 추가
      ],
      providers: [
        {
          provide: 'SERVICE_NAME', // 서비스 이름으로 주입
          useClass: service, // 주입될 클래스
        },
        DynamicService, // 동적 서비스를 모듈의 제공자로 등록
        RemoteConfigService, // RemoteConfigService를 제공자로 등록
      ],
      exports: [DynamicService, RemoteConfigService], // 다른 모듈에서 사용할 수 있도록 내보냄
    };
  }
}
