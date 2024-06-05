"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const int_util_1 = require("./int-util");
function mediumIntUnsigned() {
    return int_util_1.intDelegate(0, 16777215);
}
exports.mediumIntUnsigned = mediumIntUnsigned;
mediumIntUnsigned.nullable = () => sd.nullable(mediumIntUnsigned());
//# sourceMappingURL=int.7.js.map