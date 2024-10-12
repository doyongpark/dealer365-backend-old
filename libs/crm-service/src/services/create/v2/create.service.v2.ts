import { Injectable } from '@nestjs/common';
import { ICreateService } from '../create.interface';
import { CreateDetailsServiceV2 } from './create-details.service.v2';

@Injectable()
export class CreateServiceV2 implements ICreateService {
  constructor(private detailsService: CreateDetailsServiceV2) {} // CreateDetailsService 주입

  execute(): any {
    return {
      name: 'Desktop',
      price: 12380910941,
      details: this.detailsService.getDetails(), // 하위 서비스 호출
    };
  }
}
