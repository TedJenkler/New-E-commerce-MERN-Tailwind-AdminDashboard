import { AnyAssertFunc, AcceptsOf, TypeOf, toAssertDelegateExact } from "./types";

export function check<F extends AnyAssertFunc> (
    f : F,
    name : string,
    mixed : AcceptsOf<F>
) : TypeOf<F> {
    const d = toAssertDelegateExact(f);
    return d(name, mixed);
}

export function isOptional (assert : AnyAssertFunc) : boolean {
    const d = toAssertDelegateExact(assert);
    try {
        d("test", undefined);
        return true;
    } catch (_err) {
        //Tried to pass undefined, got error, does not allow undefined
        return false;
    }
}
export function isNullable (assert : AnyAssertFunc) : boolean {
    const d = toAssertDelegateExact(assert);
    try {
        d("test", null);
        return true;
    } catch (_err) {
        //Tried to pass null, got error, does not allow null
        return false;
    }
}
export function isMaybe (assert : AnyAssertFunc) : boolean {
    const d = toAssertDelegateExact(assert);
    try {
        d("test", undefined);
        d("test", null);
        return true;
    } catch (_err) {
        //Tried to pass undefined|null, got error, does not allow undefined|null
        return false;
    }
}

export function isOfType<F extends AnyAssertFunc> (assert : F, mixed : unknown) : mixed is TypeOf<F> {
    const d = toAssertDelegateExact(assert);
    try {
        d("test", mixed);
        return true;
    } catch (_err) {
        //Tried to pass mixed, got error, mixed is invalid
        return false;
    }
}