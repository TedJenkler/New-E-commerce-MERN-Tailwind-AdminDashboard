"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
exports.assertBoolean = sd.or(sd.boolean(), sd.chain(sd.literal("0", "1", 0, 1, "false", "true"), (name, v) => {
    switch (v) {
        case "0": return false;
        case "1": return true;
        case 0: return false;
        case 1: return true;
        case "false": return false;
        case "true": return true;
        default: {
            //Shouldn't happen
            throw new Error(`Expected ${name} to be one of '0'|'1'|0|1|'false'|'true'`);
        }
    }
}));
exports.assertTrue = sd.or(sd.literal(true), sd.chain(sd.literal("1", 1, "true"), (name, v) => {
    switch (v) {
        case "1": return true;
        case 1: return true;
        case "true": return true;
        default: {
            //Shouldn't happen
            throw new Error(`Expected ${name} to be one of '1'|1|'true'`);
        }
    }
}));
exports.assertFalse = sd.or(sd.literal(false), sd.chain(sd.literal("0", 0, "false"), (name, v) => {
    switch (v) {
        case "0": return false;
        case 0: return false;
        case "false": return false;
        default: {
            //Shouldn't happen
            throw new Error(`Expected ${name} to be one of '0'|0|'false'`);
        }
    }
}));
function boolean() {
    return exports.assertBoolean;
}
exports.boolean = boolean;
boolean.nullable = () => sd.nullable(boolean());
function getTrue() {
    return exports.assertTrue;
}
exports.true = getTrue;
getTrue.nullable = () => sd.nullable(getTrue());
function getFalse() {
    return exports.assertFalse;
}
exports.false = getFalse;
getFalse.nullable = () => sd.nullable(getFalse());
//# sourceMappingURL=boolean.js.map