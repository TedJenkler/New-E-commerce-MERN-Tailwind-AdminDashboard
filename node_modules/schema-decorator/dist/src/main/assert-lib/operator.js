"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const deep_equal_1 = require("../deep-equal");
const deep_merge_1 = require("../deep-merge");
const is_literal_or_date_1 = require("../is-literal-or-date");
const util_1 = require("../util");
function or(...arr) {
    const assertDelegates = arr.map(types_1.toAssertDelegateExact);
    return (name, mixed) => {
        let messages = [];
        for (let d of assertDelegates) {
            try {
                return d(name, mixed);
            }
            catch (err) {
                messages.push(`(${err.message})`);
            }
        }
        throw new Error(`${name} is invalid.\n${messages.join(" or \n")}`);
    };
}
exports.or = or;
function chain(...arr) {
    const assertDelegates = arr.map(types_1.toAssertDelegateExact);
    return (name, mixed) => {
        for (let d of assertDelegates) {
            mixed = d(name, mixed);
        }
        return mixed;
    };
}
exports.chain = chain;
/*
== Old style ==
function gen (n) {
let args0 = [];
let args1 = [];
let args2 = [];
for (let i=0; i<n; ++i) {
    args0.push(`F${i} extends AssertFunc<object>`);
    args1.push(`f${i} : F${i}`);
    args2.push(`TypeOf<F${i}>`);
}
return `export function intersect<${args0.join(", ")}> (${args1.join(", ")}) : AssertDelegate<${args2.join("&")}>;`;
}
arr = [];
for (let i=1; i<21; ++i) {
arr.push(gen(i));
}
arr.join("\n");
*/
/*export function intersect<F0 extends AssertFunc<object>> (f0 : F0) : AssertDelegate<TypeOf<F0>> & { __accepts : AcceptsOf<F0> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>> (f0 : F0, f1 : F1) : AssertDelegate<TypeOf<F0>&TypeOf<F1>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>, F11 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10, f11 : F11) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>&TypeOf<F11>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10>&AcceptsOf<F11> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>, F11 extends AssertFunc<object>, F12 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10, f11 : F11, f12 : F12) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>&TypeOf<F11>&TypeOf<F12>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10>&AcceptsOf<F11>&AcceptsOf<F12> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>, F11 extends AssertFunc<object>, F12 extends AssertFunc<object>, F13 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10, f11 : F11, f12 : F12, f13 : F13) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>&TypeOf<F11>&TypeOf<F12>&TypeOf<F13>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10>&AcceptsOf<F11>&AcceptsOf<F12>&AcceptsOf<F13> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>, F11 extends AssertFunc<object>, F12 extends AssertFunc<object>, F13 extends AssertFunc<object>, F14 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10, f11 : F11, f12 : F12, f13 : F13, f14 : F14) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>&TypeOf<F11>&TypeOf<F12>&TypeOf<F13>&TypeOf<F14>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10>&AcceptsOf<F11>&AcceptsOf<F12>&AcceptsOf<F13>&AcceptsOf<F14> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>, F11 extends AssertFunc<object>, F12 extends AssertFunc<object>, F13 extends AssertFunc<object>, F14 extends AssertFunc<object>, F15 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10, f11 : F11, f12 : F12, f13 : F13, f14 : F14, f15 : F15) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>&TypeOf<F11>&TypeOf<F12>&TypeOf<F13>&TypeOf<F14>&TypeOf<F15>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10>&AcceptsOf<F11>&AcceptsOf<F12>&AcceptsOf<F13>&AcceptsOf<F14>&AcceptsOf<F15> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>, F11 extends AssertFunc<object>, F12 extends AssertFunc<object>, F13 extends AssertFunc<object>, F14 extends AssertFunc<object>, F15 extends AssertFunc<object>, F16 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10, f11 : F11, f12 : F12, f13 : F13, f14 : F14, f15 : F15, f16 : F16) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>&TypeOf<F11>&TypeOf<F12>&TypeOf<F13>&TypeOf<F14>&TypeOf<F15>&TypeOf<F16>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10>&AcceptsOf<F11>&AcceptsOf<F12>&AcceptsOf<F13>&AcceptsOf<F14>&AcceptsOf<F15>&AcceptsOf<F16> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>, F11 extends AssertFunc<object>, F12 extends AssertFunc<object>, F13 extends AssertFunc<object>, F14 extends AssertFunc<object>, F15 extends AssertFunc<object>, F16 extends AssertFunc<object>, F17 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10, f11 : F11, f12 : F12, f13 : F13, f14 : F14, f15 : F15, f16 : F16, f17 : F17) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>&TypeOf<F11>&TypeOf<F12>&TypeOf<F13>&TypeOf<F14>&TypeOf<F15>&TypeOf<F16>&TypeOf<F17>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10>&AcceptsOf<F11>&AcceptsOf<F12>&AcceptsOf<F13>&AcceptsOf<F14>&AcceptsOf<F15>&AcceptsOf<F16>&AcceptsOf<F17> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>, F11 extends AssertFunc<object>, F12 extends AssertFunc<object>, F13 extends AssertFunc<object>, F14 extends AssertFunc<object>, F15 extends AssertFunc<object>, F16 extends AssertFunc<object>, F17 extends AssertFunc<object>, F18 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10, f11 : F11, f12 : F12, f13 : F13, f14 : F14, f15 : F15, f16 : F16, f17 : F17, f18 : F18) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>&TypeOf<F11>&TypeOf<F12>&TypeOf<F13>&TypeOf<F14>&TypeOf<F15>&TypeOf<F16>&TypeOf<F17>&TypeOf<F18>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10>&AcceptsOf<F11>&AcceptsOf<F12>&AcceptsOf<F13>&AcceptsOf<F14>&AcceptsOf<F15>&AcceptsOf<F16>&AcceptsOf<F17>&AcceptsOf<F18> };
export function intersect<F0 extends AssertFunc<object>, F1 extends AssertFunc<object>, F2 extends AssertFunc<object>, F3 extends AssertFunc<object>, F4 extends AssertFunc<object>, F5 extends AssertFunc<object>, F6 extends AssertFunc<object>, F7 extends AssertFunc<object>, F8 extends AssertFunc<object>, F9 extends AssertFunc<object>, F10 extends AssertFunc<object>, F11 extends AssertFunc<object>, F12 extends AssertFunc<object>, F13 extends AssertFunc<object>, F14 extends AssertFunc<object>, F15 extends AssertFunc<object>, F16 extends AssertFunc<object>, F17 extends AssertFunc<object>, F18 extends AssertFunc<object>, F19 extends AssertFunc<object>> (f0 : F0, f1 : F1, f2 : F2, f3 : F3, f4 : F4, f5 : F5, f6 : F6, f7 : F7, f8 : F8, f9 : F9, f10 : F10, f11 : F11, f12 : F12, f13 : F13, f14 : F14, f15 : F15, f16 : F16, f17 : F17, f18 : F18, f19 : F19) : AssertDelegate<TypeOf<F0>&TypeOf<F1>&TypeOf<F2>&TypeOf<F3>&TypeOf<F4>&TypeOf<F5>&TypeOf<F6>&TypeOf<F7>&TypeOf<F8>&TypeOf<F9>&TypeOf<F10>&TypeOf<F11>&TypeOf<F12>&TypeOf<F13>&TypeOf<F14>&TypeOf<F15>&TypeOf<F16>&TypeOf<F17>&TypeOf<F18>&TypeOf<F19>> & { __accepts : AcceptsOf<F0>&AcceptsOf<F1>&AcceptsOf<F2>&AcceptsOf<F3>&AcceptsOf<F4>&AcceptsOf<F5>&AcceptsOf<F6>&AcceptsOf<F7>&AcceptsOf<F8>&AcceptsOf<F9>&AcceptsOf<F10>&AcceptsOf<F11>&AcceptsOf<F12>&AcceptsOf<F13>&AcceptsOf<F14>&AcceptsOf<F15>&AcceptsOf<F16>&AcceptsOf<F17>&AcceptsOf<F18>&AcceptsOf<F19> };*/
function intersect(...assertions) {
    const assertDelegates = assertions.map(types_1.toAssertDelegateExact);
    return (name, mixed) => {
        const result = [];
        for (let d of assertDelegates) {
            result.push(d(name, mixed));
        }
        return deep_merge_1.deepMerge(...result);
    };
}
exports.intersect = intersect;
function and(...arr) {
    const assertDelegates = arr.map(types_1.toAssertDelegateExact);
    return (name, mixed) => {
        const values = [];
        for (let d of assertDelegates) {
            values.push(d(name, mixed));
        }
        if (values.length == 0) {
            return mixed;
        }
        const first = values[0];
        if (is_literal_or_date_1.isLiteralOrDate(first)) {
            for (let i = 1; i < values.length; ++i) {
                const v = values[i];
                if (!deep_equal_1.deepEqual(first, v)) {
                    throw new Error(`${name} fails check ${i}; found ${util_1.toTypeStr(v)}`);
                }
            }
            return first;
        }
        for (let i = 0; i < values.length; ++i) {
            const v = values[i];
            if (!(v instanceof Object) || (v instanceof Date)) {
                throw new Error(`${name} fails check ${i}; expected to be an object; found ${util_1.toTypeStr(v)}`);
            }
        }
        return deep_merge_1.deepMerge(...values);
    };
}
exports.and = and;
//# sourceMappingURL=operator.js.map