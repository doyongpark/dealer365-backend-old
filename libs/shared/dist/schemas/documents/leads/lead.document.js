"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadDocument = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../../constants");
class LeadDocument extends mongoose_1.Document {
    constructor() {
        super(...arguments);
        this.systemSourceEnum = constants_1.SystemSourceEnum.Dealer365;
        this.isConvertedToContact = false;
    }
}
exports.LeadDocument = LeadDocument;
//# sourceMappingURL=lead.document.js.map