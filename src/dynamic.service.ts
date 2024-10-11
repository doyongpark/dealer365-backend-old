import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class DynamicService {
  private service: any;
  private readonly logger = new Logger(DynamicService.name); // 로거 초기화

  constructor(
    @Inject('SERVICE_NAME') private initialService: any, // 초기 서비스 주입
    private eventEmitter: EventEmitter2,
  ) {
    this.service = initialService; // 초기 서비스 설정
  }

  setService(newService: any) {
    this.service = newService; // 런타임에 서비스 변경
    this.logger.log(`Service changed to: ${newService.constructor.name}`); // 서비스 변경 로깅
  }

  @OnEvent('config.changed')
  handleConfigChange(moduleName: string) {
    this.updateService(moduleName); // config.changed 이벤트 처리
  }

  updateService(moduleName: string) {
    if (moduleName === 'ProductService') {
      this.setService(new ProductService());
    } else {
      this.setService(new UserService());
    }
  }

  executeMethod() {
    this.logger.log(`Executing method from: ${this.service.constructor.name}`); // 현재 서비스 로깅
    return this.service.excute();
  }
}
