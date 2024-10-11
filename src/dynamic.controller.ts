import { Controller, Get } from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RemoteConfigService } from './remote-config.service'; // 추가된 부분

@Controller('dynamic')
export class DynamicController {
  constructor(
    private readonly dynamicService: DynamicService,
    private readonly eventEmitter: EventEmitter2,
    private readonly remoteConfigService: RemoteConfigService, // 추가된 부분
  ) {}

  @Get('execute')
  executeMethod() {
    return this.dynamicService.executeMethod();
  }
}
