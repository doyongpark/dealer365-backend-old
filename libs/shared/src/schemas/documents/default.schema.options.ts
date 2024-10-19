const base_schema_options = {
  toJSON: { virtuals: true, },
  toObject: { virtuals: true },
  versionKey: false,
};

export const schema_options_id = {
  ...base_schema_options,
  id: true,
};

export const schema_options_id_creator = {
  ...schema_options_id,
  timestamps: { createdAt: 'createdDateTimeUTC', updatedAt: false },
};

export const schema_options_id_creator_updater = {
  ...schema_options_id_creator,
  timestamps: { createdAt: 'createdDateTimeUTC', updatedAt: 'updatedDateTimeUTC' },
};

export const schema_options_no_id = {
  ...base_schema_options,
  _id: false,
};