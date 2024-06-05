import {
    AnyAssertFunc,
    toAssertDelegateExact,
    AssertDelegate,
    TypeOf,
    AcceptsOf,
    CanAcceptOf,
} from "../types";
import {or} from "./operator";
import {literal, excludeLiteral} from "./basic";

export type Optional<F extends AnyAssertFunc> = (
    AssertDelegate<TypeOf<F>|undefined> &
    {
        __accepts : AcceptsOf<F>|undefined,
        __canAccept : CanAcceptOf<F>|undefined,
    }
);
export function optional<F extends AnyAssertFunc> (assert : F) : Optional<F> {
    const assertDelegate = toAssertDelegateExact(assert);
    return or(
        literal(undefined),
        assertDelegate
    );
}
export type Nullable<F extends AnyAssertFunc> = (
    AssertDelegate<TypeOf<F>|null> &
    {
        __accepts : AcceptsOf<F>|null,
        __canAccept : CanAcceptOf<F>|null,
    }
);
export function nullable<F extends AnyAssertFunc> (assert : F) : Nullable<F> {
    const assertDelegate = toAssertDelegateExact(assert);
    return or(
        literal(null),
        assertDelegate
    );
}
export type Maybe<F extends AnyAssertFunc> = (
    AssertDelegate<TypeOf<F>|null|undefined> &
    {
        __accepts : AcceptsOf<F>|null|undefined,
        __canAccept : CanAcceptOf<F>|null|undefined,
    }
);
export function maybe<F extends AnyAssertFunc> (assert : F) : Maybe<F> {
    const assertDelegate = toAssertDelegateExact(assert);
    return or(
        literal(undefined, null),
        assertDelegate
    );
}

export function notOptional<F extends AnyAssertFunc> (assert : F) {
    return excludeLiteral(assert, undefined);
}
export function notNullable<F extends AnyAssertFunc> (assert : F) {
    return excludeLiteral(assert, null);
}
export function notMaybe<F extends AnyAssertFunc> (assert : F) {
    return excludeLiteral(assert, null, undefined);
}
