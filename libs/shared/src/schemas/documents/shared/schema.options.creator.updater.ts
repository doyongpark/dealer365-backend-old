import { schema_options_no_id } from "./schema.options.no.id";

export const schema_options_creator_updater = {
  ...schema_options_no_id,
  timestamps: { createdAt: 'createdDateTimeUTC', updatedAt: 'updatedDateTimeUTC' },
};