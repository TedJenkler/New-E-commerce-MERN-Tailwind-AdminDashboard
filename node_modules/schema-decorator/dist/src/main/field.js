"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function field(name, assert) {
    return new types_1.Field(name, assert);
}
exports.field = field;
function fields(raw) {
    const result = {};
    for (let name in raw) {
        if (!raw.hasOwnProperty(name)) {
            continue;
        }
        result[name] = field(name, raw[name]);
    }
    return result;
}
exports.fields = fields;
//# sourceMappingURL=field.js.map