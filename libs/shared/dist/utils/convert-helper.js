"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBoolean = parseBoolean;
function parseBoolean(value, defaultValue = false) {
    if (value === null || value === undefined || value.trim() === '') {
        return defaultValue;
    }
    const pattern = /^(true|1|yes)$/i;
    return pattern.test(value.trim());
}
//# sourceMappingURL=convert-helper.js.map