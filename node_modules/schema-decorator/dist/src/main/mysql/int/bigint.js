"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const bigint_util_1 = require("./bigint-util");
function bigint() {
    return bigint_util_1.bigintDelegate;
}
exports.bigint = bigint;
bigint.nullable = () => sd.nullable(bigint());
//# sourceMappingURL=bigint.js.map