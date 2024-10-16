import { AccountServiceModuleOptions } from "./accounts";
import { CheckInServiceModuleOptions } from "./check-ins";
import { DealServiceModuleOptions } from "./deals";
import { DeliveryServiceModuleOptions } from "./deliveries";
import { LeadServiceModuleOptions } from "./leads";
import { QuoteServiceModuleOptions } from "./quotes";
import { TaskServiceModuleOptions } from "./tasks";

export interface PackageCrmModuleOptions {
    accountServiceModuleOptions?: AccountServiceModuleOptions;
    dealServiceModuleOptions?: DealServiceModuleOptions;
    leadServiceModuleOptions?: LeadServiceModuleOptions;
    taskServiceModuleOptions?: TaskServiceModuleOptions;
    checkInServiceModuleOptions?: CheckInServiceModuleOptions;
    deliveryServiceModuleOptions?: DeliveryServiceModuleOptions;
    quoteServiceModuleOptions?: QuoteServiceModuleOptions;
}