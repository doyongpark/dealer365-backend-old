import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { GetTest1Data } from '@dealer365-backend/test1';
import { GetTest2Data } from '@dealer365-backend/test2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData(@Query('id') id: string) {

    if (id == '1')
      return GetTest1Data();
    else
      return GetTest2Data();
  }
}
