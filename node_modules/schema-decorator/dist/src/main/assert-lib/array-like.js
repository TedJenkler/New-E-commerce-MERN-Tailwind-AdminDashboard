"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_1 = require("./number");
const operator_1 = require("./operator");
function maxLength(max) {
    const result = (name, mixed) => {
        const length = number_1.naturalNumber()(`${name}.length`, mixed.length);
        if (length > max) {
            throw new Error(`${name} cannot be longer than ${max}, received ${length}`);
        }
        return mixed;
    };
    return result;
}
exports.maxLength = maxLength;
function minLength(min) {
    const result = (name, mixed) => {
        const length = number_1.naturalNumber()(`${name}.length`, mixed.length);
        if (length < min) {
            throw new Error(`${name} cannot be shorter than ${min}, received ${length}`);
        }
        return mixed;
    };
    return result;
}
exports.minLength = minLength;
function length(arg0, arg1) {
    if (arg1 == undefined) {
        return maxLength(arg0);
    }
    else {
        return operator_1.chain(minLength(arg0), maxLength(arg1));
    }
}
exports.length = length;
//# sourceMappingURL=array-like.js.map