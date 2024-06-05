"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("../../assert-lib");
const util_1 = require("../../util");
exports.bigintDelegate = sd.or((name, raw) => {
    if (typeof raw == "bigint") {
        return raw;
    }
    throw new Error(`Expected ${name} to be of type bigint, received ${util_1.toTypeStr(raw)}`);
}, sd.chain(sd.string(), (name, str) => {
    try {
        const result = BigInt(str);
        if (result.toString() === str) {
            return result;
        }
        throw new Error(`${name} is not a valid bigint string`);
    }
    catch (err) {
        throw new Error(`${name} is not a valid bigint string; ${err.message}`);
    }
}), sd.chain(sd.finiteNumber(), (name, n) => {
    try {
        const result = BigInt(n);
        if (Number(result) === n) {
            return result;
        }
        throw new Error(`${name} is not a valid bigint number`);
    }
    catch (err) {
        throw new Error(`${name} is not a valid bigint number; ${err.message}`);
    }
}), 
//Browser support for bigint is terrible.
(name, raw) => {
    if ((raw instanceof Object) &&
        typeof raw.toString == "function") {
        const rawStr = raw.toString();
        if (typeof rawStr != "string") {
            throw new Error(`${name}.toString() does not give a string`);
        }
        try {
            const result = BigInt(rawStr);
            if (result.toString() === rawStr) {
                return result;
            }
            throw new Error(`${name}.toString() is not a valid bigint string`);
        }
        catch (err) {
            throw new Error(`${name}.toString() is not a valid bigint string; ${err.message}`);
        }
    }
    else {
        throw new Error(`${name} is not an object with .toString()`);
    }
});
function lessThan(a, b) {
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr == bStr) {
        return false;
    }
    const aNeg = (aStr[0] == "-");
    const bNeg = (bStr[0] == "-");
    if (aNeg) {
        if (bNeg) {
            //Both negative
            if (aStr.length > bStr.length) {
                //Eg. a = -100, b = -99
                return true;
            }
            else if (aStr.length < bStr.length) {
                //Eg. a = -99, b = -100
                return false;
            }
            else {
                return aStr.localeCompare(bStr) > 0;
            }
        }
        else {
            //Eg. a = -5, b = 100
            return true;
        }
    }
    else {
        if (bNeg) {
            //Eg. a = 100, b = -5
            return false;
        }
        else {
            //Both positive
            if (aStr.length < bStr.length) {
                //Eg. a = 99, b = 100
                return true;
            }
            else if (aStr.length > bStr.length) {
                //Eg. a = 100, b = 99
                return false;
            }
            else {
                return aStr.localeCompare(bStr) < 0;
            }
        }
    }
}
exports.lessThan = lessThan;
function greaterThan(a, b) {
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr == bStr) {
        return false;
    }
    return lessThan(b, a);
}
exports.greaterThan = greaterThan;
//# sourceMappingURL=bigint-util.js.map