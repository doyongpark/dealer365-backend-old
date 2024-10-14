import { IDeleteService } from "@dealer365-backend/crm-service";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteCrmDocCommand } from "../impl/delete-crm-doc.command";

@CommandHandler(DeleteCrmDocCommand)
export class DeleteCrmDocHandler implements ICommandHandler<DeleteCrmDocCommand> {
  constructor(
    private readonly deleteService: IDeleteService,
  ) { }

  async execute(command: DeleteCrmDocCommand) {
    return await this.deleteService.execute();
  }
}