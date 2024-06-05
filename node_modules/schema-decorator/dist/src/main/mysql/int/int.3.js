"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const int_util_1 = require("./int-util");
function mediumIntSigned() {
    return int_util_1.intDelegate(-8388608, 8388607);
}
exports.mediumIntSigned = mediumIntSigned;
mediumIntSigned.nullable = () => sd.nullable(mediumIntSigned());
//# sourceMappingURL=int.3.js.map