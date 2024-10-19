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








/**@deprecated Do not use this schema. Please use baseSchemaOptions instead.*/
export const schemaOptions = { ...baseSchemaOptions };

/**@deprecated Do not use this schema. Please use defaultSchemaOptions instead.*/
export const schemaOptionsForEntity = { ...defaultSchemaOptions, id: true, };

/**@deprecated Do not use this schema. Please use defaultSchemaOptions instead. */
export const schemaOptionsForSubEntity = { ...defaultSchemaOptions, id: true, };

// export const schemaOptionsNotIdForEntity = {
//   id: false,
//   toJSON: {
//     virtuals: true,
//   },
//   toObject: { virtuals: true },
// };

// export const schemaOptionsIDFalse = {
//   timestamps: { createdAt: 'createdDateTimeUTC', updatedAt: 'updatedDateTimeUTC' },
//   id: false,
//   versionKey: false,
//   toJSON: {
//     virtuals: true,
//   },
//   toObject: { virtuals: true },
// };

/**@deprecated Do not use this schema. Please use emptySchemaOptions instead. */
export const schemaOptions_IDFalse = {
  _id: false
};
