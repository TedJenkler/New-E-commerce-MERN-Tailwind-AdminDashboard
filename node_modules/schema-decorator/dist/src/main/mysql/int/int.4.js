"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const int_util_1 = require("./int-util");
function intSigned() {
    return int_util_1.intDelegate(-2147483648, 2147483647);
}
exports.intSigned = intSigned;
intSigned.nullable = () => sd.nullable(intSigned());
//# sourceMappingURL=int.4.js.map