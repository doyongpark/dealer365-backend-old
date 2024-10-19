import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { SystemSourceEnum } from "../../constants";
import { BsaeIdDto } from "./base.id.dto";

export class BaseDto extends BsaeIdDto {
  @Expose() @ApiPropertyOptional() systemSourceEnum?: SystemSourceEnum;
  @Expose() @ApiPropertyOptional() createdDateTimeUTC?: Date;
  @Expose() @ApiPropertyOptional() creatorUserId?: string;
  @Expose() @ApiPropertyOptional() creatorUserName?: string;
  @Expose() @ApiPropertyOptional() updatedDateTimeUTC?: Date;
  @Expose() @ApiPropertyOptional() updaterUserId?: string;
  @Expose() @ApiPropertyOptional() updaterUserName?: string;
}
