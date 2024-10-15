
import { IUpdateService } from "@dealer365-backend/crm-service";
import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateCrmDocCommand } from "../impl/update-crm-doc.command";

@CommandHandler(UpdateCrmDocCommand)
export class UpdateCrmDocHandler implements ICommandHandler<UpdateCrmDocCommand> {

  constructor(private readonly createService: IUpdateService) { }

  async execute(command: UpdateCrmDocCommand) {
    return await this.createService.execute();
  }
}