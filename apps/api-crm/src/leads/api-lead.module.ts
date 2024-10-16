import { Module } from '@nestjs/common';
import { ApiLeadController } from './api-lead.controller';
import { ApiLeadService } from './api-lead.service';


@Module({
  imports: [],
  controllers: [ApiLeadController],
  providers: [ApiLeadService],
})
export class ApiLeadModule { }