import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductService } from './services/product/product.service';
import { UserService } from './services/user/user.service';

@Injectable()
export class CrmDynamicService {
  private service: any;
  private readonly logger = new Logger(this.constructor.name);

  constructor(
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
