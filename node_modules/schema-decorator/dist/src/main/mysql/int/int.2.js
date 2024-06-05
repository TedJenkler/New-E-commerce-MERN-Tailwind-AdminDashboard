"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const int_util_1 = require("./int-util");
function smallIntSigned() {
    return int_util_1.intDelegate(-32768, 32767);
}
exports.smallIntSigned = smallIntSigned;
smallIntSigned.nullable = () => sd.nullable(smallIntSigned());
//# sourceMappingURL=int.2.js.map