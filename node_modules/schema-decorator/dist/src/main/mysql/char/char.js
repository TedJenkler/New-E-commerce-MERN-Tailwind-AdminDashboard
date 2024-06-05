"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
function strDelegate(dataTypeStr, absoluteMax) {
    const result = (a, b) => {
        if (a == undefined) {
            return sd.varChar(absoluteMax);
        }
        else if (b == undefined) {
            a = sd.chain(sd.integer(), sd.gtEq(1), sd.ltEq(absoluteMax))("maxLength", a);
            return sd.varChar(a);
        }
        else {
            a = sd.chain(sd.integer(), sd.gtEq(0), sd.ltEq(absoluteMax))("minLength", a);
            b = sd.chain(sd.integer(), sd.gtEq(1), sd.ltEq(absoluteMax))("maxLength", b);
            if (a > b) {
                throw new Error(`${dataTypeStr} minLength must be <= maxLength`);
            }
            return sd.varChar(a, b);
        }
    };
    result.nullable = (a, b) => {
        return sd.nullable(result(a, b));
    };
    return result;
}
exports.strDelegate = strDelegate;
exports.char = strDelegate("CHAR", 255);
exports.varChar = strDelegate("VARCHAR", 65535);
exports.tinyText = strDelegate("TINYTEXT", 255);
exports.text = strDelegate("TEXT", 65535);
exports.mediumText = strDelegate("MEDIUMTEXT", 16777215);
exports.longText = strDelegate("LONGTEXT", 4294967295);
//# sourceMappingURL=char.js.map