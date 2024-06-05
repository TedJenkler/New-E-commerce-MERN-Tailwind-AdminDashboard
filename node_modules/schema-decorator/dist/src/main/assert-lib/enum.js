"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = require("./basic");
const operator_1 = require("./operator");
const util_1 = require("../util");
//Please only pass enums here
var Enum;
(function (Enum) {
})(Enum = exports.Enum || (exports.Enum = {}));
function getKeys(e) {
    return Object.keys(e)
        .filter((k) => {
        if (/^\d/.test(k)) {
            return false;
        }
        const v = e[k];
        return (typeof v == "string" ||
            typeof v == "number");
    });
}
function enumeration(e) {
    const keys = Object.keys(e)
        .filter((k) => {
        if (/^\d/.test(k)) {
            return false;
        }
        const v = e[k];
        return (typeof v == "string" ||
            typeof v == "number");
    });
    const values = keys.map(k => e[k]);
    return basic_1.literal(...values);
}
exports.enumeration = enumeration;
function enumerationKey(e) {
    const keys = Object.keys(e)
        .filter((k) => {
        if (/^\d/.test(k)) {
            return false;
        }
        const v = e[k];
        return (typeof v == "string" ||
            typeof v == "number");
    });
    return basic_1.literal(...keys);
}
exports.enumerationKey = enumerationKey;
//Will attempt to cast between key <-> value
function toEnumeration(e) {
    const keys = Object.keys(e)
        .filter((k) => {
        if (/^\d/.test(k)) {
            return false;
        }
        const v = e[k];
        return (typeof v == "string" ||
            typeof v == "number");
    });
    const values = keys.map(k => e[k]);
    const field = values.concat(keys.filter(k => values.indexOf(k) < 0));
    return operator_1.or(basic_1.literal(...values), 
    //Not a value, so maybe a key
    (name, mixed) => {
        for (let k of keys) {
            if (k === mixed) {
                //This key maps to this value
                return e[k];
                ;
            }
        }
        throw new Error(`Expected ${name} to be one of ${field.join("|")}}; received ${util_1.toTypeStr(mixed)}`);
    });
}
exports.toEnumeration = toEnumeration;
function toEnumerationKey(e) {
    const keys = Object.keys(e)
        .filter((k) => {
        if (/^\d/.test(k)) {
            return false;
        }
        const v = e[k];
        return (typeof v == "string" ||
            typeof v == "number");
    });
    const values = keys.map(k => e[k]);
    const field = keys.concat(values.filter(v => keys.indexOf(v) < 0));
    return operator_1.or(basic_1.literal(...keys), 
    //Not a key, so maybe a value
    (name, mixed) => {
        for (let k of keys) {
            const v = e[k];
            if (v === mixed) {
                //This value belongs to this key
                return k;
            }
        }
        throw new Error(`Expected ${name} to be one of ${field.join("|")}; received ${util_1.toTypeStr(mixed)}`);
    });
}
exports.toEnumerationKey = toEnumerationKey;
function toOneEnumerationKey(e, k) {
    const validKeys = getKeys(e);
    if (validKeys.indexOf(k) < 0) {
        throw new Error(`Unknown key ${k} for given enum; valid keys are ${validKeys.join(", ")}`);
    }
    const value = e[k];
    return operator_1.or(basic_1.literal(k), 
    //Not a key, so maybe a value
    (name, mixed) => {
        if (value === mixed) {
            //This value belongs to this key
            return k;
        }
        throw new Error(`Expected ${name} to be ${k}; received ${util_1.toTypeStr(mixed)}`);
    });
}
exports.toOneEnumerationKey = toOneEnumerationKey;
function toSubsetEnumerationKey(e, ...kArr) {
    const validKeys = getKeys(e);
    for (let k of kArr)
        if (validKeys.indexOf(k) < 0) {
            throw new Error(`Unknown key ${k} for given enum; valid keys are ${validKeys.join(", ")}`);
        }
    return operator_1.or(basic_1.literal(...kArr), 
    //Not a key, so maybe a value
    (name, mixed) => {
        for (let k of validKeys) {
            const v = e[k];
            if (v === mixed) {
                //This value belongs to this key
                return k;
            }
        }
        throw new Error(`Expected ${name} to be one of ${validKeys.join("|")}; received ${util_1.toTypeStr(mixed)}`);
    });
}
exports.toSubsetEnumerationKey = toSubsetEnumerationKey;
//# sourceMappingURL=enum.js.map