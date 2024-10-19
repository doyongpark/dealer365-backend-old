import { Schema } from 'mongoose';
import { Lead } from '../../domains';
import { schema_options_id_creator_updater } from '../default.schema.options';

export const LeadSchema = new Schema<Lead>(
  {
    id: { type: String, required: true },
    systemSourceEnum: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    comment: { type: String, required: true },
    addresses: { type: String, required: true },
    contacts: { type: String, required: true },
    isConvertedToContact: { type: Boolean, required: true },
    createdDateTimeUTC: { type: Date, required: true },
    creatorUserId: { type: String, required: true },
    creatorUserName: { type: String, required: true },
    updatedDateTimeUTC: { type: Date, required: true },
    updaterUserId: { type: String, required: true },
    updaterUserName: { type: String, required: true },
  },
  schema_options_id_creator_updater
);