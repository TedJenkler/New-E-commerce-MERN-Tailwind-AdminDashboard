import {AssertDelegate} from "../types";
import {literal} from "./basic";
import {or} from "./operator";
import {toTypeStr} from "../util";

//Please only pass enums here
export enum Enum {}


function getKeys<E extends typeof Enum> (e : E) {
    return Object.keys(e)
        .filter((k) => {
            if (/^\d/.test(k)) {
                return false;
            }
            const v = (e as any)[k];
            return (
                typeof v == "string" ||
                typeof v == "number"
            );
        });
}

export type EnumerationAssertDelegate<E extends typeof Enum> = (
    AssertDelegate<E[keyof E]> &
    {
        __accepts : E[keyof E],
        __canAccept : E[keyof E],
    }
);
export function enumeration<E extends typeof Enum> (e : E) : (
    EnumerationAssertDelegate<E>
) {
    const keys = Object.keys(e)
        .filter((k) => {
            if (/^\d/.test(k)) {
                return false;
            }
            const v = (e as any)[k];
            return (
                typeof v == "string" ||
                typeof v == "number"
            );
        });
    const values = keys.map(k => (e as any)[k]);
    return literal(...values) as any;
}

export type EnumerationKeyAssertDelegate<E extends typeof Enum> = (
    AssertDelegate<Extract<keyof E, string>> &
    {
        __accepts : Extract<keyof E, string>,
        __canAccept : Extract<keyof E, string>,
    }
);
export function enumerationKey<E extends typeof Enum> (e : E) : (
    EnumerationKeyAssertDelegate<E>
) {
    const keys = Object.keys(e)
        .filter((k) => {
            if (/^\d/.test(k)) {
                return false;
            }
            const v = (e as any)[k];
            return (
                typeof v == "string" ||
                typeof v == "number"
            );
        });
    return literal(...keys) as any;
}

export type ToEnumerationAssertDelegate<E extends typeof Enum> = (
    AssertDelegate<E[keyof E]> &
    {
        __accepts : E[keyof E],
        __canAccept : (
            Extract<keyof E, string>|
            E[keyof E]
        )
    }
);
//Will attempt to cast between key <-> value
export function toEnumeration<E extends typeof Enum> (e : E) : (
    ToEnumerationAssertDelegate<E>
) {
    const keys = Object.keys(e)
        .filter((k) => {
            if (/^\d/.test(k)) {
                return false;
            }
            const v = (e as any)[k];
            return (
                typeof v == "string" ||
                typeof v == "number"
            );
        });
    const values = keys.map(k => (e as any)[k]);
    const field = values.concat(
        keys.filter(k => values.indexOf(k) < 0)
    );
    return or(
        literal(...values),
        //Not a value, so maybe a key
        (name : string, mixed : unknown) => {
            for (let k of keys) {
                if (k === mixed) {
                    //This key maps to this value
                    return (e as any)[k];;
                }
            }
            throw new Error(`Expected ${name} to be one of ${field.join("|")}}; received ${toTypeStr(mixed)}`);
        }
    ) as any;
}

export type ToEnumerationKeyAssertDelegate<E extends typeof Enum> = (
    AssertDelegate<Extract<keyof E, string>> &
    {
        __accepts : Extract<keyof E, string>,
        __canAccept : (
            Extract<keyof E, string>|
            E[keyof E]
        )
    }
);
export function toEnumerationKey<E extends typeof Enum> (e : E) : (
    ToEnumerationKeyAssertDelegate<E>
) {
    const keys = Object.keys(e)
        .filter((k) => {
            if (/^\d/.test(k)) {
                return false;
            }
            const v = (e as any)[k];
            return (
                typeof v == "string" ||
                typeof v == "number"
            );
        });
    const values = keys.map(k => (e as any)[k]);
    const field = keys.concat(
        values.filter(v => keys.indexOf(v) < 0)
    );
    return or(
        literal(...keys),
        //Not a key, so maybe a value
        (name : string, mixed : unknown) => {
            for (let k of keys) {
                const v = (e as any)[k];
                if (v === mixed) {
                    //This value belongs to this key
                    return k;
                }
            }
            throw new Error(`Expected ${name} to be one of ${field.join("|")}; received ${toTypeStr(mixed)}`);
        }
    ) as any;
}

export type ToOneEnumerationKeyAssertDelegate<E extends typeof Enum, K extends (keyof E)&string> = (
    AssertDelegate<K> &
    {
        __accepts : K,
        __canAccept : (
            K|
            E[K]
        )
    }
);
export function toOneEnumerationKey<E extends typeof Enum, K extends (keyof E)&string> (e : E, k : K) : (
    ToOneEnumerationKeyAssertDelegate<E, K>
) {
    const validKeys = getKeys(e);
    if (validKeys.indexOf(k) < 0) {
        throw new Error(`Unknown key ${k} for given enum; valid keys are ${validKeys.join(", ")}`);
    }
    const value = e[k];
    return or(
        literal(k),
        //Not a key, so maybe a value
        (name : string, mixed : unknown) => {
            if (value === mixed) {
                //This value belongs to this key
                return k;
            }
            throw new Error(`Expected ${name} to be ${k}; received ${toTypeStr(mixed)}`);
        }
    ) as any;
}

export type ToSubsetEnumerationKey<E extends typeof Enum, KArr extends ((keyof E)&string)[]> = (
    AssertDelegate<{
        [k in Exclude<keyof KArr, keyof any[]>] : (
            KArr[k]
        )
    }[Exclude<keyof KArr, keyof any[]>]> &
    {
        __accepts : {
            [k in Exclude<keyof KArr, keyof any[]>] : (
                KArr[k]
            )
        }[Exclude<keyof KArr, keyof any[]>],
        __canAccept : (
            {
                [k in Exclude<keyof KArr, keyof any[]>] : (
                    KArr[k]
                )
            }[Exclude<keyof KArr, keyof any[]>]|
            E[Extract<
                {
                    [k in Exclude<keyof KArr, keyof any[]>] : (
                        KArr[k]
                    )
                }[Exclude<keyof KArr, keyof any[]>],
                keyof E
            >]
        )
    }
);
export function toSubsetEnumerationKey<E extends typeof Enum, KArr extends ((keyof E)&string)[]> (e : E, ...kArr : KArr) : (
    ToSubsetEnumerationKey<E, KArr>
) {
    const validKeys = getKeys(e);
    for (let k of kArr)
    if (validKeys.indexOf(k) < 0) {
        throw new Error(`Unknown key ${k} for given enum; valid keys are ${validKeys.join(", ")}`);
    }
    return or(
        literal(...kArr),
        //Not a key, so maybe a value
        (name : string, mixed : unknown) => {
            for (let k of validKeys) {
                const v = (e as any)[k];
                if (v === mixed) {
                    //This value belongs to this key
                    return k;
                }
            }
            throw new Error(`Expected ${name} to be one of ${validKeys.join("|")}; received ${toTypeStr(mixed)}`);
        }
    ) as any;
}
