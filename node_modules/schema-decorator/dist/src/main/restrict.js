"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function restrict(assert, name, raw) {
    return types_1.toAssertDelegateExact(assert)(name, raw);
}
exports.restrict = restrict;
//# sourceMappingURL=restrict.js.map