"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operator_1 = require("./operator");
const basic_1 = require("./basic");
const util_1 = require("../util");
function jsonObjectStr() {
    return operator_1.chain(basic_1.string(), (name, str) => {
        let jsonObject = undefined;
        try {
            jsonObject = JSON.parse(str);
        }
        catch (err) {
            throw new Error(`Expected ${name} to be a valid JSON string; ${err.message}`);
        }
        const jsonStr = JSON.stringify(jsonObject);
        if (jsonStr[0] != "{") {
            throw new Error(`Expected ${name} to be a JSON object`);
        }
        //We return the result of JSON.stringify() to use the minimal amount of space
        return jsonStr;
    });
}
exports.jsonObjectStr = jsonObjectStr;
function jsonObjectToString() {
    return ((name, mixed) => {
        if (!(mixed instanceof Object) || (mixed instanceof Date) || (mixed instanceof Array) || (mixed instanceof Function)) {
            throw new Error(`${name} is not a valid JSON object; expected an object; received ${util_1.toTypeStr(mixed)}`);
        }
        try {
            return JSON.stringify(mixed);
        }
        catch (err) {
            throw new Error(`${name} is not a valid JSON object; ${err.message}`);
        }
    });
}
exports.jsonObjectToString = jsonObjectToString;
function jsonStringToObject() {
    return (name, str) => {
        if (typeof str != "string") {
            throw new Error(`Expected ${name} to be of type string; received ${util_1.toTypeStr(str)}`);
        }
        try {
            const result = JSON.parse(str);
            if (!(result instanceof Object) || (result instanceof Date) || (result instanceof Array) || (result instanceof Function)) {
                throw new Error(`${name} to represent a valid JSON object; expected an object; received ${util_1.toTypeStr(result)}`);
            }
            return result;
        }
        catch (err) {
            throw new Error(`${name} is not a valid JSON string; ${err.message}`);
        }
    };
}
exports.jsonStringToObject = jsonStringToObject;
function jsonObject() {
    return operator_1.or(operator_1.chain(jsonObjectStr(), jsonStringToObject()), operator_1.chain(jsonObjectToString(), jsonObjectStr(), jsonStringToObject()));
}
exports.jsonObject = jsonObject;
//# sourceMappingURL=json.js.map