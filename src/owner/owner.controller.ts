import { Controller, Get, Logger } from '@nestjs/common';
import { OwnerService } from './owner.service';

@Controller('owners')
export class OwnerController {
  private logger = new Logger(OwnerController.name);

  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  findAll() {
    this.logger.log('GET request to /owners');
    return this.ownerService.findAll(); // 모든 소유자를 반환하는 메서드
  }
}
