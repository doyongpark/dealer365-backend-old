import { DatabaseModule } from '@dealer365-backend/database';
import { NestModule } from '@dealer365-backend/nest';
import { SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ApiProductController } from './api-product.controller';
import { ApiProductService } from './api-product.service';

@Module({
  imports: [DatabaseModule, SharedModule, NestModule],
  controllers: [ApiProductController],
  providers: [ApiProductService],
})
export class ApiProductModule {}
