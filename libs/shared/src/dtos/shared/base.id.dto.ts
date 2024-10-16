import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BsaeIdDto {
  @Expose() @ApiPropertyOptional() id?: string;
}
