// src/app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from './config/config.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { OwnerModule } from './owner/owner.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    HttpModule,
    VehicleModule,
    OwnerModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
