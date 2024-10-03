import { CrmEntity, CrmRepository, CrmSchema } from '@dealer365-backend/database';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './commands';
import { CrmsController } from './crm.controller';
import { CrmEventBus } from './events';
import { QueryHandlers } from './queries';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CrmEntity.name, schema: CrmSchema }]), 
    CqrsModule],
  controllers: [CrmsController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    CrmRepository,
    CrmEventBus],
})
export class CrmModule { }

