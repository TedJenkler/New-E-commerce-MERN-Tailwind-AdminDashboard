"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cast_1 = require("./cast");
const number_1 = require("./number");
const basic_1 = require("./basic");
const operator_1 = require("./operator");
function numberToBoolean() {
    return cast_1.cast(number_1.finiteNumber(), (raw) => {
        return (raw != 0);
    }, basic_1.boolean());
}
exports.numberToBoolean = numberToBoolean;
function stringToBoolean() {
    return cast_1.cast(basic_1.string(), (raw) => {
        if (raw == "1" || raw.toLowerCase() == "true") {
            return true;
        }
        else {
            return false;
        }
    }, basic_1.boolean());
}
exports.stringToBoolean = stringToBoolean;
function numberToTrue() {
    return operator_1.chain(numberToBoolean(), basic_1.unknown(), basic_1.literal(true));
}
exports.numberToTrue = numberToTrue;
function numberToFalse() {
    return operator_1.chain(numberToBoolean(), basic_1.unknown(), basic_1.literal(false));
}
exports.numberToFalse = numberToFalse;
function stringToTrue() {
    return operator_1.chain(stringToBoolean(), basic_1.unknown(), basic_1.literal(true));
}
exports.stringToTrue = stringToTrue;
function stringToFalse() {
    return operator_1.chain(stringToBoolean(), basic_1.unknown(), basic_1.literal(false));
}
exports.stringToFalse = stringToFalse;
//# sourceMappingURL=boolean.js.map