"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../constants");
const shared_1 = require("../shared");
exports.LeadSchema = new mongoose_1.Schema({
    systemSourceEnum: { type: String, required: false, default: constants_1.SystemSourceEnum.Dealer365 },
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
}, shared_1.schema_options_creator_updater);
//# sourceMappingURL=lead.schema.js.map