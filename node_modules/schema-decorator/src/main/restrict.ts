import {AnyAssertFunc, TypeOf, toAssertDelegateExact} from "./types";

export function restrict<F extends AnyAssertFunc, RawT extends TypeOf<F>> (assert : F, name : string, raw : RawT) : TypeOf<F> {
    return toAssertDelegateExact(assert)(name, raw);
}
