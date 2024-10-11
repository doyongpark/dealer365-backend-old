import { Controller, Get, Logger } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  private logger = new Logger(VehicleController.name);

  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll() {
    this.logger.log('GET request to /vehicles');
    return this.vehicleService.findAll(); // 모든 차량을 반환하는 메서드
  }
}
