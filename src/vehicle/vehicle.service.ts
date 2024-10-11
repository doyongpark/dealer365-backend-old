import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class VehicleService {
  private vehicles = [
    { id: 1, model: 'Toyota Camry', year: 2020 },
    { id: 2, model: 'Honda Accord', year: 2019 },
    { id: 3, model: 'Ford Mustang', year: 2021 },
  ];
  private logger = new Logger(VehicleService.name);

  findAll() {
    this.logger.log('Finding all vehicles...');
    return this.vehicles; // 모든 차량 반환
  }

  // 추가적인 차량 관련 메서드 구현 가능
}
