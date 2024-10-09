import { DatabaseService } from '@dealer365-backend/database';
import { NestService } from '@dealer365-backend/nest';
import { SharedService } from '@dealer365-backend/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiProductService {
  constructor(private readonly d: DatabaseService,
    private readonly s: SharedService,
    private readonly n: NestService
  ) {

  }
  getHello(): string {
    return this.s.getData();
  }
}
