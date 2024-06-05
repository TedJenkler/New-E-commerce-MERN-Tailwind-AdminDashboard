"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const util_1 = require("../../util");
const unsafe_int_1 = require("./unsafe-int");
exports.unsafeIntDelegate = sd.or(sd.stringToInteger(), (name, raw) => {
    if (typeof raw == "bigint") {
        const result = Number(raw);
        if (BigInt(result) !== raw) {
            throw new Error(`${name} bigint value is too large, or too small`);
        }
        else {
            return result;
        }
    }
    throw new Error(`Expected ${name} to be of type bigint, received ${util_1.toTypeStr(raw)}`);
});
function intDelegate(min, max) {
    return sd.chain(unsafe_int_1.unsafeInt(), sd.gtEq(min), sd.ltEq(max));
}
exports.intDelegate = intDelegate;
//# sourceMappingURL=int-util.js.map