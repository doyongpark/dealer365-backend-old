import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class DynamicService {
  private service: any;
  private readonly logger = new Logger(DynamicService.name);

  constructor(
    private eventEmitter: EventEmitter2,
    private userService: UserService,
    private productService: ProductService,
  ) {
    this.service = this.userService; // 기본 서비스 설정 (UserService로 초기화)
  }

  setService(newService: any) {
    this.service = newService;
    this.logger.log(`Service changed to: ${newService.constructor.name}`);
  }

  @OnEvent('config.changed')
  handleConfigChange(moduleName: string) {
    this.updateService(moduleName);
  }

  updateService(moduleName: string) {
    if (moduleName === 'ProductService') {
      this.setService(this.productService);
    } else {
      this.setService(this.userService);
    }
  }

  executeMethod() {
    this.logger.log(`Executing method from: ${this.service.constructor.name}`);
    return this.service.execute();
  }
}
