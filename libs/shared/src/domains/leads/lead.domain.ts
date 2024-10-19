import { Expose } from "class-transformer";
import { SystemSourceEnum } from "../../constants";
import { IMayHaveUpdater, IMustHaveCreator, IMustHaveId, IMustHaveSystemSourceEnum } from "../shared";

export class Lead implements IMustHaveId, IMustHaveSystemSourceEnum, IMustHaveCreator, IMayHaveUpdater {
  @Expose() _id: string;
  @Expose() systemSourceEnum: SystemSourceEnum = SystemSourceEnum.Dealer365;
  @Expose() firstName?: string;
  @Expose() lastName: string;
  @Expose() fullName?: string;
  @Expose() comment?: string;
  @Expose() addresses?: string;
  @Expose() contacts?: string;
  @Expose() isConvertedToContact?: boolean = false;
  @Expose() createdDateTimeUTC: Date;
  @Expose() creatorUserId: string;
  @Expose() creatorUserName: string;
  @Expose() updatedDateTimeUTC?: Date;
  @Expose() updaterUserId?: string;
  @Expose() updaterUserName?: string;
}