"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function toParameter(...args) {
    const asserts = args.slice(0, args.length - 1);
    const func = args[args.length - 1];
    const assertDelegates = asserts.map(types_1.toAssertDelegateExact);
    return (...args) => {
        const values = [];
        for (let i = 0; i < assertDelegates.length; ++i) {
            values.push(assertDelegates[i](`args[${i}]`, args[i]));
        }
        return func(...values);
    };
}
exports.toParameter = toParameter;
//# sourceMappingURL=to-parameter.js.map