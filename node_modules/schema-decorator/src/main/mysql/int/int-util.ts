import * as sd from "../../assert-lib";
import {toTypeStr} from "../../util";
import {unsafeInt} from "./unsafe-int";

export const unsafeIntDelegate = sd.or(
    sd.stringToInteger(),
    (name : string, raw : unknown) : number => {
        if (typeof raw == "bigint") {
            const result = Number(raw);
            if (BigInt(result) !== raw) {
                throw new Error(`${name} bigint value is too large, or too small`);
            } else {
                return result;
            }
        }
        throw new Error(`Expected ${name} to be of type bigint, received ${toTypeStr(raw)}`);
    },
);
export function intDelegate (min : number, max : number) {
    return sd.chain(
        unsafeInt(),
        sd.gtEq(min),
        sd.ltEq(max)
    );
}