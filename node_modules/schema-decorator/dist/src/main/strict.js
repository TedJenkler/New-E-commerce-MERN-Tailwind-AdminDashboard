"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function strict(f) {
    return types_1.toAssertDelegateExact(f);
}
exports.strict = strict;
function relaxed(f) {
    return types_1.toAssertDelegateExact(f);
}
exports.relaxed = relaxed;
function eraseCanAccept(f) {
    return types_1.toAssertDelegateExact(f);
}
exports.eraseCanAccept = eraseCanAccept;
//# sourceMappingURL=strict.js.map