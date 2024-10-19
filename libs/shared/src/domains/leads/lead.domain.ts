import { SystemSourceEnum } from "@dealer365-backend/shared/constants";
import { IMayHaveUpdater, IMustHaveCreator, IMustHaveId, IMustHaveSystemSourceEnum } from "../../interfaces";

export class Lead implements IMustHaveId, IMustHaveSystemSourceEnum, IMustHaveCreator, IMayHaveUpdater {
  id: string;
  systemSourceEnum: SystemSourceEnum = SystemSourceEnum.Dealer365;
  firstName?: string;
  lastName: string;
  fullName?: string;
  comment?: string;
  addresses?: string;
  contacts?: string;
  isConvertedToContact: boolean = false;
  createdDateTimeUTC: Date;
  creatorUserId: string;
  creatorUserName: string;
  updatedDateTimeUTC?: Date;
  updaterUserId?: string;
  updaterUserName?: string;
}