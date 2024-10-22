"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema_options_creator_updater = void 0;
const schema_options_no_id_1 = require("./schema.options.no.id");
exports.schema_options_creator_updater = {
    ...schema_options_no_id_1.schema_options_no_id,
    timestamps: { createdAt: 'createdDateTimeUTC', updatedAt: 'updatedDateTimeUTC' },
};
//# sourceMappingURL=schema.options.creator.updater.js.map