"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const int_util_1 = require("./int-util");
function unsafeInt() {
    return int_util_1.unsafeIntDelegate;
}
exports.unsafeInt = unsafeInt;
unsafeInt.nullable = () => sd.nullable(unsafeInt());
//# sourceMappingURL=unsafe-int.js.map