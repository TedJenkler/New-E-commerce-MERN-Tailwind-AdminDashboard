import {chain} from "./operator";
import {unsafeNumber} from "./basic";

export function finiteNumber () {
    return chain(
        unsafeNumber(),
        (name : string, num : number) : number => {
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
        }
    );
}
//Alias for finiteNumber()
export function number () {
    return finiteNumber();
}

export function integer () {
    return chain(
        finiteNumber(),
        (name : string, num : number) : number => {
            if (Math.floor(num) !== num) {
                throw new Error(`${name} must be an integer, received ${num}`);
            }
            return num;
        }
    );
}
export function nonNegativeNumber () {
    return chain(
        finiteNumber(),
        (name : string, num : number) : number => {
            if (num < 0) {
                throw new Error(`${name} cannot be negative, received ${num}`);
            }
            return num;
        }
    );
}
export function naturalNumber () {
    return chain(
        integer(),
        nonNegativeNumber()
    );
}
export function gt (x : number) {
    return chain(
        finiteNumber(),
        (name : string, num : number) => {
            if (num > x) {
                return num;
            } else {
                throw new Error(`${name} must be greater than ${x}; received ${num}`);
            }
        }
    );
}
export function lt (x : number) {
    return chain(
        finiteNumber(),
        (name : string, num : number) => {
            if (num < x) {
                return num;
            } else {
                throw new Error(`${name} must be less than ${x}; received ${num}`);
            }
        }
    );
}
export function gtEq (x : number) {
    return chain(
        finiteNumber(),
        (name : string, num : number) => {
            if (num >= x) {
                return num;
            } else {
                throw new Error(`${name} must be greater than, or equal to ${x}; received ${num}`);
            }
        }
    );
}
export function ltEq (x : number) {
    return chain(
        finiteNumber(),
        (name : string, num : number) => {
            if (num <= x) {
                return num;
            } else {
                throw new Error(`${name} must be less than, or equal to ${x}; received ${num}`);
            }
        }
    );
}
export function neq (x : number) {
    return chain(
        finiteNumber(),
        (name : string, num : number) => {
            if (num != x) {
                return num;
            } else {
                throw new Error(`${name} cannot be ${x}; received ${num}`);
            }
        }
    );
}

export function numberToString () {
    return chain(
        finiteNumber(),
        (_name : string, num : number) : string => {
            return num.toString();
        }
    );
}