import { Injectable } from '@nestjs/common';
import { IDeleteService } from '../delete.interface';
import { DeleteDetailsService } from './delete-details.service';

@Injectable()
export class DeleteService implements IDeleteService {
  constructor(private detailsService: DeleteDetailsService) { } // DeleteDetailsService 주입

  execute(): any {
    return {
      name: 'Laptop',
      price: 1200,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
