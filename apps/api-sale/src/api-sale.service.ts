import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiSaleService {
  getHello(): string {
    return 'Hello World!';
  }
}
