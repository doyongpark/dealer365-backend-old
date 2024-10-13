import { Injectable } from '@nestjs/common';
import { IUpdateService } from '../update.interface';
import { UpdateDetailsService } from './update-details.service';

@Injectable()
export class UpdateService implements IUpdateService {
  constructor(private detailsService: UpdateDetailsService) { } // UpdateDetailsService 주입

  execute(): any {
    return {
      name: 'Laptop',
      price: 1200,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
