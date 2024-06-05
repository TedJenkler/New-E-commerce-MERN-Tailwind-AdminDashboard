"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const int_util_1 = require("./int-util");
function tinyIntUnsigned() {
    return int_util_1.intDelegate(0, 255);
}
exports.tinyIntUnsigned = tinyIntUnsigned;
tinyIntUnsigned.nullable = () => sd.nullable(tinyIntUnsigned());
//# sourceMappingURL=int.5.js.map