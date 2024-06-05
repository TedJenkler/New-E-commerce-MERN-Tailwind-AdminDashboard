"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const bigint_util_1 = require("./bigint-util");
const bigintUnsignedDelegate = sd.chain(bigint_util_1.bigintDelegate, (name, value) => {
    if (bigint_util_1.lessThan(value, BigInt("0"))) {
        throw new Error(`${name} must be >= 0`);
    }
    if (bigint_util_1.greaterThan(value, BigInt("18446744073709551616"))) {
        throw new Error(`${name} must be <= 18,446,744,073,709,551,616`);
    }
    return value;
});
function bigintUnsigned() {
    return bigintUnsignedDelegate;
}
exports.bigintUnsigned = bigintUnsigned;
bigintUnsigned.nullable = () => sd.nullable(bigintUnsigned());
//# sourceMappingURL=bigint-unsigned.js.map