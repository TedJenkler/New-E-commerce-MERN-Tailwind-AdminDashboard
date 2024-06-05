import {TypeOf, AssertDelegate, AnyAssertFunc, toAssertDelegateExact} from "../types";
import {toTypeStr} from "../util";

function toLiteralStr (arr : any[]) : string {
    const mapped = arr.map((i) => {
        if (i === null) {
            return "null";
        } else if (i === undefined) {
            return "undefined";
        } else {
            return i;
        }
    });
    return mapped.join("|")
}

export type LiteralType = string|number|boolean|undefined|null|bigint;
export type LiteralValues<ArrT extends LiteralType[]> = (
    ArrT extends Array<infer T> ?
        T:
        never
)
export function literal<ArrT extends LiteralType[]> (...arr : ArrT) : (
    AssertDelegate<LiteralValues<ArrT>>
) {
    return (name : string, mixed : unknown) : (
        LiteralValues<ArrT>
    ) => {
        for (let item of arr) {
            if (mixed === item) {
                return mixed as any;
            }
        }
        throw new Error(`Expected ${name} to be one of ${toLiteralStr(arr)}; received ${toTypeStr(mixed)}`);
    };
}

export function excludeLiteral<
    F extends AnyAssertFunc,
    ArrT extends LiteralType[]
> (assert : F, ...arr : ArrT) : (
    AssertDelegate<Exclude<
        TypeOf<F>,
        LiteralValues<ArrT>
    >>
) {
    const assertDelegate = toAssertDelegateExact(assert);
    return (name : string, mixed : unknown) => {
        const value = assertDelegate(name, mixed);
        for (let item of arr) {
            if (value === item) {
                throw new Error(`${name} cannot be one of ${toLiteralStr(arr)}; received ${toTypeStr(value)}`);
            }
        }
        return value as any;
    };
}

export function boolean () : AssertDelegate<boolean> {
    return (name : string, mixed : unknown) : boolean => {
        if (typeof mixed != "boolean") {
            throw new Error(`${name} must be a boolean, received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}
//Unsafe because it allows NaN and +/-Infinity
export function unsafeNumber () : AssertDelegate<number> {
    return (name : string, mixed : unknown) : number => {
        if (typeof mixed != "number") {
            throw new Error(`${name} must be a number, received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}

export function string () : AssertDelegate<string> {
    return (name : string, mixed : unknown) : string => {
        if (typeof mixed != "string") {
            throw new Error(`${name} must be a string, received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}

export function nil () : AssertDelegate<null> {
    return (name : string, mixed : unknown) => {
        if (mixed === null) {
            return null;
        }
        throw new Error(`Expected ${name} to be null, received ${toTypeStr(mixed)}`);
    };
}
export function undef () : AssertDelegate<undefined> {
    return (name : string, mixed : unknown) => {
        if (mixed === undefined) {
            return undefined;
        }
        throw new Error(`Expected ${name} to be undefined, received ${toTypeStr(mixed)}`);
    };
}

export function undefToNil () : AssertDelegate<null> {
    return (name : string, mixed : unknown) => {
        if (mixed == undefined) {
            return null;
        }
        throw new Error(`Expected ${name} to be null|undefined, received ${toTypeStr(mixed)}`);
    };
}
export function nilToUndef () : AssertDelegate<undefined> {
    return (name : string, mixed : unknown) => {
        if (mixed == undefined) {
            return undefined;
        }
        throw new Error(`Expected ${name} to be null|undefined, received ${toTypeStr(mixed)}`);
    };
}

//Try not to use this, if you really need to, `unknown` might be better
export function any () : AssertDelegate<any> {
    return (_name : string, mixed : unknown) : any => {
        return mixed;
    }
}

export function unknown () : AssertDelegate<unknown> {
    return (_name : string, mixed : unknown) : unknown => {
        return mixed;
    }
}
