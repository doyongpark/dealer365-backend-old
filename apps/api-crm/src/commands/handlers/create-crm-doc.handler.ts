
import { ICreateService } from "@dealer365-backend/crm-service";
import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCrmDocCommand } from "../impl/create-crm-doc.command";

@CommandHandler(CreateCrmDocCommand)
export class CreateCrmDocHandler implements ICommandHandler<CreateCrmDocCommand> {

  constructor(private createService: ICreateService) { }

  async execute(command: CreateCrmDocCommand) {
    return await this.createService.execute();
  }
}