import { Controller, Get } from '@nestjs/common';
import { DynamicService } from './dynamic.service';

@Controller('dynamic')
export class DynamicController {
  constructor(private readonly dynamicService: DynamicService) {}

  @Get('execute')
  executeMethod() {
    return this.dynamicService.executeMethod();
  }
}
