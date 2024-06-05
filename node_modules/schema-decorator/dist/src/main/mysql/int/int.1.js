"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const int_util_1 = require("./int-util");
function tinyIntSigned() {
    return int_util_1.intDelegate(-128, 127);
}
exports.tinyIntSigned = tinyIntSigned;
tinyIntSigned.nullable = () => sd.nullable(tinyIntSigned());
//# sourceMappingURL=int.1.js.map