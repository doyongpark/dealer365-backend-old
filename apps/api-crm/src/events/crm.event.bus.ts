import { Logger } from "@nestjs/common";

export class CrmEventBus {
  
  async publish(event: any) {
    Logger.debug(`Event published. ${JSON.stringify(event)}. This will be queued soon.`);
  } 
}
