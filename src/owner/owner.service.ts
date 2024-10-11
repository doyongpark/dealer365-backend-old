import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OwnerService {
  private owners = [
    { id: 1, name: 'John Doe', vehicleId: 1 },
    { id: 2, name: 'Jane Smith', vehicleId: 2 },
    { id: 3, name: 'Alice Johnson', vehicleId: 1 },
  ];
  private logger = new Logger(OwnerService.name);

  findAll() {
    this.logger.log('Finding all owners...');
    return this.owners; // 모든 소유자 반환
  }

  // 추가적인 소유자 관련 메서드 구현 가능
}
