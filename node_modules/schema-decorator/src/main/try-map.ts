import {AnyAssertFunc, AcceptsOf, TypeOf, toAssertDelegate} from "./types"

export type TryMapResult<T> = (
    | {
        success : true,
        value : T,
    }
    | {
        success : false,
        err : any,
    }
);
export function tryMap<F extends AnyAssertFunc> (f : F, name : string, mixed : AcceptsOf<F>) : TryMapResult<TypeOf<F>> {
    try {
        return {
            success : true,
            value : toAssertDelegate(f)(name, mixed),
        };
    } catch (err) {
        return {
            success : false,
            err,
        };
    }
};