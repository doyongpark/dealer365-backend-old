import { Injectable } from '@nestjs/common';
import { UpdateDetailsService } from './update-details.service'; // UpdateDetailsService 임포트

@Injectable()
export class UpdateService {
  constructor(private detailsService: UpdateDetailsService) {} // UpdateDetailsService 주입

  execute() {
    return {
      name: 'John Doe',
      age: 30,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
