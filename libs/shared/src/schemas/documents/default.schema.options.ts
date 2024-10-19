const base_schema_options = {
  toJSON: { virtuals: true, },
  toObject: { virtuals: true },
  versionKey: false,
};

export const schema_options_no_id = {
  ...base_schema_options,
  id: false,
};

export const schema_options_creator = {
  ...schema_options_no_id,
  timestamps: { createdAt: 'createdDateTimeUTC', updatedAt: false },
};

export const schema_options_creator_updater = {
  ...schema_options_no_id,
  timestamps: { createdAt: 'createdDateTimeUTC', updatedAt: 'updatedDateTimeUTC' },
};

export const schema_options_empty = {
  ...base_schema_options,
  _id: false,
};