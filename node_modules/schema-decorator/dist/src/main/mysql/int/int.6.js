"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const int_util_1 = require("./int-util");
function smallIntUnsigned() {
    return int_util_1.intDelegate(0, 65535);
}
exports.smallIntUnsigned = smallIntUnsigned;
smallIntUnsigned.nullable = () => sd.nullable(smallIntUnsigned());
//# sourceMappingURL=int.6.js.map