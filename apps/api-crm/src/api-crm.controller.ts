import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCrmDocCommand } from './commands/impl/create-crm-doc.command';
import { CrmDocDto } from './dtos';
import { GetCrmDocsQuery } from './queries/impl/get-crm-docs.query';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCrmDocCommand } from './commands/impl/update-crm-doc.command';
import { DeleteCrmDocCommand } from './commands/impl/delete-crm-doc.command';

@ApiTags('CRM')
@Controller('crm')
export class ApiCrmController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post()
  async addCrmDoc(@Body() dto: CrmDocDto) {
    return this.commandBus.execute(new CreateCrmDocCommand(dto));
  }

  @Get()
  getCrmDocs() {
    return this.queryBus.execute(new GetCrmDocsQuery({}));
  }

  // @Get(':id')
  // getCrmDoc() {
  //   return this.queryBus.execute(new GetCrmDocsQuery({}));
  // }

  @Put(':id')
  updateCrmDoc(@Param('id') id: string, @Body() dto: CrmDocDto) {
    return this.commandBus.execute(new UpdateCrmDocCommand(id, dto));
  }

  @Delete(':id')
  DeleteCrmDoc(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteCrmDocCommand(id));
  }
}
