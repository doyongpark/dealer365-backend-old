import { Module } from '@nestjs/common';
import { CrmDatabaseService } from './crm-database.service';

@Module({
  providers: [CrmDatabaseService],
  exports: [CrmDatabaseService],
})
export class CrmDatabaseModule {}
