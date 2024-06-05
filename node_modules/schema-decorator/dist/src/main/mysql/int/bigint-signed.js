"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const bigint_util_1 = require("./bigint-util");
const bigintSignedDelegate = sd.chain(bigint_util_1.bigintDelegate, (name, value) => {
    if (bigint_util_1.lessThan(value, BigInt("-9223372036854775808"))) {
        throw new Error(`${name} must be >= -9,223,372,036,854,775,808`);
    }
    if (bigint_util_1.greaterThan(value, BigInt("9223372036854775807"))) {
        throw new Error(`${name} must be <= 9,223,372,036,854,775,807`);
    }
    return value;
});
function bigintSigned() {
    return bigintSignedDelegate;
}
exports.bigintSigned = bigintSigned;
bigintSigned.nullable = () => sd.nullable(bigintSigned());
//# sourceMappingURL=bigint-signed.js.map