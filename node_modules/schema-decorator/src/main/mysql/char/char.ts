import * as sd from "../../assert-lib";
import {AssertDelegate} from "../../types";

export interface StrDelegateNullable {
    (minLength : number, maxLength : number) : AssertDelegate<string|null>,
    (maxLength : number) : AssertDelegate<string|null>,
    () : AssertDelegate<string|null>,
}
export function strDelegate (
    dataTypeStr : string,
    absoluteMax : number,
) : {
    (minLength : number, maxLength : number) : AssertDelegate<string>,
    (maxLength : number) : AssertDelegate<string>,
    () : AssertDelegate<string>,

    nullable : StrDelegateNullable,
} {
    const result = (a? : number, b? : number) => {
        if (a == undefined) {
            return sd.varChar(absoluteMax);
        } else if (b == undefined) {
            a = sd.chain(
                sd.integer(),
                sd.gtEq(1),
                sd.ltEq(absoluteMax)
            )("maxLength", a);
            return sd.varChar(a);
        } else {
            a = sd.chain(
                sd.integer(),
                sd.gtEq(0),
                sd.ltEq(absoluteMax)
            )("minLength", a);
            b = sd.chain(
                sd.integer(),
                sd.gtEq(1),
                sd.ltEq(absoluteMax)
            )("maxLength", b);
            if (a > b) {
                throw new Error(`${dataTypeStr} minLength must be <= maxLength`);
            }
            return sd.varChar(a, b);
        }
    }
    result.nullable = (a? : number, b? : number) => {
        return sd.nullable(result(a, b));
    };
    return result;
}
export const char = strDelegate("CHAR", 255);
export const varChar = strDelegate("VARCHAR", 65535);
export const tinyText = strDelegate("TINYTEXT", 255);
export const text = strDelegate("TEXT", 65535);
export const mediumText = strDelegate("MEDIUMTEXT", 16777215);
export const longText = strDelegate("LONGTEXT", 4294967295);