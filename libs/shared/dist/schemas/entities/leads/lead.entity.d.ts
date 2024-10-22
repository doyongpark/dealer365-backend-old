import { BaseEntity } from 'typeorm';
import { SystemSourceEnum } from '../../../constants';
import { Lead } from '../../../domains';
export declare class LeadEntity extends BaseEntity implements Lead {
    _id: string;
    systemSourceEnum: SystemSourceEnum;
    firstName?: string;
    lastName: string;
    fullName?: string;
    comment?: string;
    addresses?: string;
    contacts?: string;
    isConvertedToContact: boolean;
    createdDateTimeUTC: Date;
    creatorUserId: string;
    creatorUserName: string;
    updatedDateTimeUTC?: Date;
    updaterUserId?: string;
    updaterUserName?: string;
}
