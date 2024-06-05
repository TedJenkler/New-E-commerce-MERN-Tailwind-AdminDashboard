"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function check(f, name, mixed) {
    const d = types_1.toAssertDelegateExact(f);
    return d(name, mixed);
}
exports.check = check;
function isOptional(assert) {
    const d = types_1.toAssertDelegateExact(assert);
    try {
        d("test", undefined);
        return true;
    }
    catch (_err) {
        //Tried to pass undefined, got error, does not allow undefined
        return false;
    }
}
exports.isOptional = isOptional;
function isNullable(assert) {
    const d = types_1.toAssertDelegateExact(assert);
    try {
        d("test", null);
        return true;
    }
    catch (_err) {
        //Tried to pass null, got error, does not allow null
        return false;
    }
}
exports.isNullable = isNullable;
function isMaybe(assert) {
    const d = types_1.toAssertDelegateExact(assert);
    try {
        d("test", undefined);
        d("test", null);
        return true;
    }
    catch (_err) {
        //Tried to pass undefined|null, got error, does not allow undefined|null
        return false;
    }
}
exports.isMaybe = isMaybe;
function isOfType(assert, mixed) {
    const d = types_1.toAssertDelegateExact(assert);
    try {
        d("test", mixed);
        return true;
    }
    catch (_err) {
        //Tried to pass mixed, got error, mixed is invalid
        return false;
    }
}
exports.isOfType = isOfType;
//# sourceMappingURL=check.js.map