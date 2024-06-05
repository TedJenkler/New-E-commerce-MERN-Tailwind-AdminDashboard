"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const int_util_1 = require("./int-util");
function intUnsigned() {
    return int_util_1.intDelegate(0, 4294967295);
}
exports.intUnsigned = intUnsigned;
intUnsigned.nullable = () => sd.nullable(intUnsigned());
//# sourceMappingURL=int.8.js.map