"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const assertDouble = sd.or(sd.finiteNumber(), sd.stringToNumber());
function double() {
    return assertDouble;
}
exports.double = double;
double.nullable = () => sd.nullable(double());
//# sourceMappingURL=double.js.map