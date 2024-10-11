import { Injectable } from '@nestjs/common';
import { DeleteDetailsService } from './delete-details.service'; // DeleteDetailsService 임포트

@Injectable()
export class DeleteService {
  constructor(private detailsService: DeleteDetailsService) {} // DeleteDetailsService 주입

  execute() {
    return {
      name: 'John Doe',
      age: 30,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
