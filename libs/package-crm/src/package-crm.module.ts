import { Module } from '@nestjs/common';
import { CrmAccountServiceModule } from './accounts';
import { CrmDealServiceModule } from './deals';
import { CrmLeadServiceModule } from './leads';
import { PackageCrmService } from './package-crm.service';
import { SaleCheckInServiceModule } from './sale-check-ins';
import { SaleDeliveryServiceModule } from './sale-deliveries';
import { SaleQuoteServiceModule } from './sale-quotes';
import { CrmTaskServiceModule } from './tasks';


const subModules = [
  CrmAccountServiceModule, CrmDealServiceModule, CrmLeadServiceModule, CrmTaskServiceModule,
  SaleCheckInServiceModule, SaleDeliveryServiceModule, SaleQuoteServiceModule
];

@Module({
  providers: [PackageCrmService],
  exports: [PackageCrmService],
})
export class PackageCrmModule {}
