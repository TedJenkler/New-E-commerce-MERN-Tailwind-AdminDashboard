import * as sd from "../../assert-lib";
import {toTypeStr} from "../../util";

export const bigintDelegate = sd.or(
    (name : string, raw : unknown) : bigint => {
        if (typeof raw == "bigint") {
            return raw;
        }
        throw new Error(`Expected ${name} to be of type bigint, received ${toTypeStr(raw)}`);
    },
    sd.chain(
        sd.string(),
        (name : string, str : string) : bigint => {
            try {
                const result = BigInt(str);
                if (result.toString() === str) {
                    return result;
                }
                throw new Error(`${name} is not a valid bigint string`);
            } catch (err) {
                throw new Error(`${name} is not a valid bigint string; ${err.message}`);
            }
        }
    ),
    sd.chain(
        sd.finiteNumber(),
        (name : string, n : number) : bigint => {
            try {
                const result = BigInt(n);
                if (Number(result) === n) {
                    return result;
                }
                throw new Error(`${name} is not a valid bigint number`);
            } catch (err) {
                throw new Error(`${name} is not a valid bigint number; ${err.message}`);
            }
        }
    ),
    //Browser support for bigint is terrible.
    (name : string, raw : unknown) => {
        if (
            (raw instanceof Object) &&
            typeof raw.toString == "function"
        ) {
            const rawStr = raw.toString();
            if (typeof rawStr != "string") {
                throw new Error(`${name}.toString() does not give a string`);
            }
            try {
                const result = BigInt(rawStr);
                if (result.toString() === rawStr) {
                    return result;
                }
                throw new Error(`${name}.toString() is not a valid bigint string`);
            } catch (err) {
                throw new Error(`${name}.toString() is not a valid bigint string; ${err.message}`);
            }
        } else {
            throw new Error(`${name} is not an object with .toString()`);
        }
    }
);

export function lessThan (a : bigint, b : bigint) {
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr == bStr) {
        return false;
    }
    const aNeg = (aStr[0] == "-");
    const bNeg = (bStr[0] == "-");
    if (aNeg) {
        if (bNeg) {
            //Both negative
            if (aStr.length > bStr.length) {
                //Eg. a = -100, b = -99
                return true;
            } else if (aStr.length < bStr.length) {
                //Eg. a = -99, b = -100
                return false;
            } else {
                return aStr.localeCompare(bStr) > 0;
            }
        } else {
            //Eg. a = -5, b = 100
            return true;
        }
    } else {
        if (bNeg) {
            //Eg. a = 100, b = -5
            return false;
        } else {
            //Both positive
            if (aStr.length < bStr.length) {
                //Eg. a = 99, b = 100
                return true;
            } else if (aStr.length > bStr.length) {
                //Eg. a = 100, b = 99
                return false;
            } else {
                return aStr.localeCompare(bStr) < 0;
            }
        }
    }
}
export function greaterThan (a : bigint, b : bigint) {
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr == bStr) {
        return false;
    }
    return lessThan(b, a);
}