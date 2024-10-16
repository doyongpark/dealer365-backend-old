import { SystemSourceEnum } from "../../constants";
import { BaseIdEntity } from "./base.id.entity";

export class BaseEntity extends BaseIdEntity {
  systemSourceEnum?: SystemSourceEnum;
  createdDateTimeUTC?: Date;
  creatorUserId?: string;
  creatorUserName?: string;
  updatedDateTimeUTC?: Date;
  updaterUserId?: string;
  updaterUserName?: string;
}