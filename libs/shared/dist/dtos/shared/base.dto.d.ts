import { SystemSourceEnum } from "../../constants";
import { BsaeIdDto } from "./base.id.dto";
export declare class BaseDto extends BsaeIdDto {
    systemSourceEnum?: SystemSourceEnum;
    createdDateTimeUTC?: Date;
    creatorUserId?: string;
    creatorUserName?: string;
    updatedDateTimeUTC?: Date;
    updaterUserId?: string;
    updaterUserName?: string;
}
