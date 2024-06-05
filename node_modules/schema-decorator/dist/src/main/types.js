"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert = require("./convert");
const missing_value_1 = require("./assert-lib/missing-value");
const strict_1 = require("./strict");
const myUtil = require("./util");
class Field {
    constructor(name, assert) {
        this.name = name;
        this.assert = assert;
        this.assertDelegate = toAssertDelegateExact(assert);
    }
    maybe() {
        return new Field(this.name, missing_value_1.maybe(this.assertDelegate));
    }
    optional() {
        return new Field(this.name, missing_value_1.optional(this.assertDelegate));
    }
    nullable() {
        return new Field(this.name, missing_value_1.nullable(this.assertDelegate));
    }
    notMaybe() {
        return new Field(this.name, missing_value_1.notMaybe(this.assertDelegate));
    }
    notOptional() {
        return new Field(this.name, missing_value_1.notOptional(this.assertDelegate));
    }
    notNullable() {
        return new Field(this.name, missing_value_1.notNullable(this.assertDelegate));
    }
    strict() {
        return new Field(this.name, strict_1.strict(this.assertDelegate));
    }
    relaxed() {
        return new Field(this.name, strict_1.relaxed(this.assertDelegate));
    }
    withName(name) {
        return new Field(name, this.assert);
    }
    withAssert(assert) {
        return new Field(this.name, assert);
    }
    assertType(arg0, arg1) {
        if (arg1 == undefined) {
            return this.assertDelegate(this.name, arg0);
        }
        else {
            return this.assertDelegate(arg0, arg1);
        }
    }
}
exports.Field = Field;
function nested(ctor) {
    return ((name, mixed) => {
        const result = convert.toClass(name, mixed, ctor);
        return result;
    });
}
exports.nested = nested;
function nestedExact(ctor) {
    return ((name, mixed) => {
        const result = convert.toClassExact(name, mixed, ctor);
        return result;
    });
}
exports.nestedExact = nestedExact;
function isCtor(assertFunc) {
    if (assertFunc instanceof Field) {
        return false;
    }
    return (assertFunc.length == 0 &&
        myUtil.allowsInstanceOf(assertFunc));
}
exports.isCtor = isCtor;
function toAssertDelegate(assertFunc) {
    if (assertFunc instanceof Field) {
        return assertFunc.assertDelegate;
    }
    else if (isCtor(assertFunc)) {
        return nested(assertFunc);
    }
    else {
        return assertFunc;
    }
}
exports.toAssertDelegate = toAssertDelegate;
function toAssertDelegateExact(assertFunc) {
    if (assertFunc instanceof Field) {
        return assertFunc.assertDelegate;
    }
    else if (isCtor(assertFunc)) {
        return nestedExact(assertFunc);
    }
    else {
        return assertFunc;
    }
}
exports.toAssertDelegateExact = toAssertDelegateExact;
//# sourceMappingURL=types.js.map