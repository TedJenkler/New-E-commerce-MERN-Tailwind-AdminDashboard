"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("./field");
const util_1 = require("./util");
function schema(...fields) {
    const d = (name, mixed) => {
        if (!(mixed instanceof Object) || (mixed instanceof Date) || (mixed instanceof Array)) {
            throw new Error(`Expected ${name} to be an object; received ${util_1.toTypeStr(mixed)}`);
        }
        const result = {};
        for (let f of fields) {
            result[f.name] = f.assertDelegate(`${name}.${f.name}`, mixed[f.name]);
        }
        return result;
    };
    return d;
}
exports.schema = schema;
function partialSchema(...fields) {
    const optionalFields = fields.map(f => f.optional());
    const d = (name, mixed) => {
        if (!(mixed instanceof Object) || (mixed instanceof Date) || (mixed instanceof Array)) {
            throw new Error(`Expected ${name} to be an object; received ${util_1.toTypeStr(mixed)}`);
        }
        const result = {};
        for (let f of optionalFields) {
            result[f.name] = f.assertDelegate(`${name}.${f.name}`, mixed[f.name]);
        }
        return result;
    };
    return d;
}
exports.partialSchema = partialSchema;
//https://github.com/Microsoft/TypeScript/issues/26207
function toSchemaImpl(raw) {
    const fieldCollection = field_1.fields(raw);
    const fieldArray = [];
    for (let k in fieldCollection) {
        if (fieldCollection.hasOwnProperty(k)) {
            //HACK
            fieldArray.push(fieldCollection[k]);
        }
    }
    return schema(...fieldArray);
}
exports.toSchema = toSchemaImpl;
exports.toSchema2 = toSchemaImpl;
exports.toSchema3 = toSchemaImpl;
exports.toSchema4 = toSchemaImpl;
/*
Demonstration of the bug, and why toSchema() requires multiple copies
per level of nesting.

import {number} from "./assert-lib/number";

const n2 = toSchema({
    z : number()
});
const n3 = toSchema({
    z3 : number()
});
const raw = {
    nested2 : n2,
    nested3 : n3
};
const ts = toSchema(raw);
const ts2 = toSchema2(raw);
*/
function toPartialSchemaImpl(raw) {
    const fieldCollection = field_1.fields(raw);
    const fieldArray = [];
    for (let k in fieldCollection) {
        if (fieldCollection.hasOwnProperty(k)) {
            //HACK
            fieldArray.push(fieldCollection[k].optional());
        }
    }
    return schema(...fieldArray);
}
exports.toPartialSchema = toPartialSchemaImpl;
//# sourceMappingURL=schema.js.map