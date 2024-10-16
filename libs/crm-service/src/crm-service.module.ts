import { Module } from '@nestjs/common';
import { CrmAccountServiceModule } from './accounts';
import { CrmDealServiceModule } from './deals';
import { CrmLeadServiceModule } from './leads';
import { SaleCheckInServiceModule } from './sale-check-ins';
import { SaleDeliveryServiceModule } from './sale-deliveries';
import { SaleQuoteServiceModule } from './sale-quotes';
import { CrmTaskServiceModule } from './tasks';

const subModules = [
  CrmAccountServiceModule, CrmDealServiceModule, CrmLeadServiceModule, CrmTaskServiceModule,
  SaleCheckInServiceModule, SaleDeliveryServiceModule, SaleQuoteServiceModule
];

@Module({
  imports: [...subModules],
  providers: [],
  exports: [...subModules],
})
export class CrmServiceModule { }
