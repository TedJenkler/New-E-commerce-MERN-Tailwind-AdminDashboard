"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operator_1 = require("./operator");
const basic_1 = require("./basic");
function finiteNumber() {
    return operator_1.chain(basic_1.unsafeNumber(), (name, num) => {
        if (typeof num != "number") {
            throw new Error("");
        }
        if (isNaN(num)) {
            throw new Error(`${name} cannot be NaN, received ${num}`);
        }
        if (!isFinite(num)) {
            throw new Error(`${name} must be finite, received ${num}`);
        }
        return num;
    });
}
exports.finiteNumber = finiteNumber;
//Alias for finiteNumber()
function number() {
    return finiteNumber();
}
exports.number = number;
function integer() {
    return operator_1.chain(finiteNumber(), (name, num) => {
        if (Math.floor(num) !== num) {
            throw new Error(`${name} must be an integer, received ${num}`);
        }
        return num;
    });
}
exports.integer = integer;
function nonNegativeNumber() {
    return operator_1.chain(finiteNumber(), (name, num) => {
        if (num < 0) {
            throw new Error(`${name} cannot be negative, received ${num}`);
        }
        return num;
    });
}
exports.nonNegativeNumber = nonNegativeNumber;
function naturalNumber() {
    return operator_1.chain(integer(), nonNegativeNumber());
}
exports.naturalNumber = naturalNumber;
function gt(x) {
    return operator_1.chain(finiteNumber(), (name, num) => {
        if (num > x) {
            return num;
        }
        else {
            throw new Error(`${name} must be greater than ${x}; received ${num}`);
        }
    });
}
exports.gt = gt;
function lt(x) {
    return operator_1.chain(finiteNumber(), (name, num) => {
        if (num < x) {
            return num;
        }
        else {
            throw new Error(`${name} must be less than ${x}; received ${num}`);
        }
    });
}
exports.lt = lt;
function gtEq(x) {
    return operator_1.chain(finiteNumber(), (name, num) => {
        if (num >= x) {
            return num;
        }
        else {
            throw new Error(`${name} must be greater than, or equal to ${x}; received ${num}`);
        }
    });
}
exports.gtEq = gtEq;
function ltEq(x) {
    return operator_1.chain(finiteNumber(), (name, num) => {
        if (num <= x) {
            return num;
        }
        else {
            throw new Error(`${name} must be less than, or equal to ${x}; received ${num}`);
        }
    });
}
exports.ltEq = ltEq;
function neq(x) {
    return operator_1.chain(finiteNumber(), (name, num) => {
        if (num != x) {
            return num;
        }
        else {
            throw new Error(`${name} cannot be ${x}; received ${num}`);
        }
    });
}
exports.neq = neq;
function numberToString() {
    return operator_1.chain(finiteNumber(), (_name, num) => {
        return num.toString();
    });
}
exports.numberToString = numberToString;
//# sourceMappingURL=number.js.map