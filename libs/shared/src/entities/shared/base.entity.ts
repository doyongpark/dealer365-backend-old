import { Document } from "mongoose";
import { SystemSourceEnum } from "../../constants";

export class BaseEntity extends Document {
  systemSourceEnum?: SystemSourceEnum;
  createdDateTimeUTC?: Date;
  creatorUserId?: string;
  creatorUserName?: string;
  updatedDateTimeUTC?: Date;
  updaterUserId?: string;
  updaterUserName?: string;
}