"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const operator_1 = require("./operator");
const basic_1 = require("./basic");
function optional(assert) {
    const assertDelegate = types_1.toAssertDelegateExact(assert);
    return operator_1.or(basic_1.literal(undefined), assertDelegate);
}
exports.optional = optional;
function nullable(assert) {
    const assertDelegate = types_1.toAssertDelegateExact(assert);
    return operator_1.or(basic_1.literal(null), assertDelegate);
}
exports.nullable = nullable;
function maybe(assert) {
    const assertDelegate = types_1.toAssertDelegateExact(assert);
    return operator_1.or(basic_1.literal(undefined, null), assertDelegate);
}
exports.maybe = maybe;
function notOptional(assert) {
    return basic_1.excludeLiteral(assert, undefined);
}
exports.notOptional = notOptional;
function notNullable(assert) {
    return basic_1.excludeLiteral(assert, null);
}
exports.notNullable = notNullable;
function notMaybe(assert) {
    return basic_1.excludeLiteral(assert, null, undefined);
}
exports.notMaybe = notMaybe;
//# sourceMappingURL=missing-value.js.map