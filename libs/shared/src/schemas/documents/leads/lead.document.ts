import { Document } from 'mongoose';
import { SystemSourceEnum } from '../../../constants';
import { Lead } from '../../../domains';

export class LeadDocument extends Document implements Lead {
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