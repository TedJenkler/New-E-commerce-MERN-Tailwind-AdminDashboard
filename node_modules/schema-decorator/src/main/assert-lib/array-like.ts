import {AssertDelegate} from "../types";
import {naturalNumber} from "./number";
import {chain} from "./operator";

export function maxLength (max : number) : (
    AssertDelegate<{ length : number }> &
    {
        __accepts : { length : number }
    }
) {
    const result : AssertDelegate<{ length : number }> = (name : string, mixed : unknown) : { length : number } => {
        const length = naturalNumber()(`${name}.length`, (mixed as any).length);
        if (length > max) {
            throw new Error(`${name} cannot be longer than ${max}, received ${length}`);
        }
        return mixed as any;
    };
    return result as any;
}
export function minLength (min : number) : (
    AssertDelegate<{ length : number }> &
    {
        __accepts : { length : number }
    }
) {
    const result : AssertDelegate<{ length : number }> = (name : string, mixed : unknown) : { length : number } => {
        const length = naturalNumber()(`${name}.length`, (mixed as any).length);
        if (length < min) {
            throw new Error(`${name} cannot be shorter than ${min}, received ${length}`);
        }
        return mixed as any;
    };
    return result as any;
}

export function length (
    max : number
) : (
    AssertDelegate<{ length : number }> &
    {
        __accepts : { length : number }
    }
);
export function length (
    min : number,
    max : number
) : (
    AssertDelegate<{ length : number }> &
    {
        __accepts : { length : number }
    }
);
export function length (
    arg0 : number,
    arg1? : number
) : (
    AssertDelegate<{ length : number }> &
    {
        __accepts : { length : number }
    }
);
export function length (
    arg0 : number,
    arg1? : number
) : (
    AssertDelegate<{ length : number }> &
    {
        __accepts : { length : number }
    }
) {
    if (arg1 == undefined) {
        return maxLength(arg0);
    } else {
        return chain(
            minLength(arg0),
            maxLength(arg1)
        );
    }
}