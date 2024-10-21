import { Schema } from 'mongoose';
import { SystemSourceEnum } from '../../../constants';
import { Lead } from '../../../domains';
import { schema_options_creator_updater } from '../shared';

export const LeadSchema = new Schema<Lead>(
  {
    systemSourceEnum: { type: String, required: false, default: SystemSourceEnum.Dealer365 },
    firstName: { type: String, required: false },
    lastName: { type: String, required: true },
    fullName: { type: String, required: false },
    comment: { type: String, required: false },
    addresses: { type: String, required: false },
    contacts: { type: String, required: false },
    isConvertedToContact: { type: Boolean, required: false, default: false },
    createdDateTimeUTC: { type: Date, required: false },
    creatorUserId: { type: String, required: false },
    creatorUserName: { type: String, required: false },
    updatedDateTimeUTC: { type: Date, required: false },
    updaterUserId: { type: String, required: false },
    updaterUserName: { type: String, required: false },
  },
  schema_options_creator_updater
);