import {toTypeStr} from "./util";

function deepMergeImpl (a : any, b : any) : any {
    if (a === b) {
        return a;
    }

    if ((a instanceof Date) || (b instanceof Date)) {
        if (!(a instanceof Date)) {
            throw new Error(`Cannot merge ${toTypeStr(a)} with a Date`);
        }
        if (!(b instanceof Date)) {
            throw new Error(`Cannot merge Date with a ${toTypeStr(b)}`);
        }
        if (a.getTime() === b.getTime()) {
            return a;
        } else {
            throw new Error(`Cannot merge dates ${a.getTime()} and ${b.getTime()}; they must be the same value`);
        }
    }

    if ((a instanceof Array) || (b instanceof Array)) {
        if (!(a instanceof Array)) {
            throw new Error(`Cannot merge ${toTypeStr(a)} with an array`);
        }
        if (!(b instanceof Array)) {
            throw new Error(`Cannot merge an array with a ${toTypeStr(b)}`);
        }
        const newArray : any[] = [];
        const max = Math.max(a.length, b.length);
        for (let i=0; i<max; ++i) {
            if (i < a.length) {
                if (i < b.length) {
                    newArray.push(deepMergeImpl(a[i], b[i]));
                } else {
                    newArray.push(a[i]);
                }
            } else {
                newArray.push(b[i]);
            }
        }
        return newArray;
    }

    if (
        a == undefined ||
        typeof a != "object" ||
        b == undefined ||
        typeof b != "object"
    ) {
        if (a === b) {
            return a;
        } else {
            throw new Error(`Cannot merge ${toTypeStr(a)} and ${toTypeStr(b)}; they are not equal`);
        }
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    const mergedKeys : { [key : string] : true|undefined } = {};

    const result : any = {};

    for (let key of aKeys) {
        if (mergedKeys[key] === true) {
            continue;
        }
        mergedKeys[key] = true;

        if (b.hasOwnProperty(key)) {
            result[key] = deepMergeImpl(a[key], b[key]);
        } else {
            result[key] = a[key];
        }
    }
    for (let key of bKeys) {
        if (mergedKeys[key] === true) {
            continue;
        }
        mergedKeys[key] = true;

        if (a.hasOwnProperty(key)) {
            result[key] = deepMergeImpl(a[key], b[key]);
        } else {
            result[key] = b[key];
        }
    }

    return result;
}

export function deepMerge (...args : any[]) : any {
    if (args.length == 0) {
        return undefined;
    }
    let result = args[0];
    for (let i=1; i<args.length; ++i) {
        result = deepMergeImpl(result, args[i]);
    }
    return result;
}