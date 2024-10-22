import { SystemSourceEnum } from "../../constants";
import { IMayHaveUpdater, IMustHaveCreator, IMustHaveId, IMustHaveSystemSourceEnum } from "../shared";
export declare class Lead implements IMustHaveId, IMustHaveSystemSourceEnum, IMustHaveCreator, IMayHaveUpdater {
    _id: string;
    systemSourceEnum: SystemSourceEnum;
    firstName?: string;
    lastName: string;
    fullName?: string;
    comment?: string;
    addresses?: string;
    contacts?: string;
    isConvertedToContact?: boolean;
    createdDateTimeUTC: Date;
    creatorUserId: string;
    creatorUserName: string;
    updatedDateTimeUTC?: Date;
    updaterUserId?: string;
    updaterUserName?: string;
}
