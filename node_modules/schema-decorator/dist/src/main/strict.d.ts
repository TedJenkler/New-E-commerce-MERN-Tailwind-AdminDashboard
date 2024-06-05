import { AnyAssertFunc, AssertDelegate, TypeOf, CanAcceptOf, AcceptsOf } from "./types";
export declare type StrictAssertDelegate<F extends AnyAssertFunc> = (AssertDelegate<TypeOf<F>> & {
    __accepts: TypeOf<F>;
    __canAccept: CanAcceptOf<F>;
});
export declare function strict<F extends AnyAssertFunc>(f: F): (StrictAssertDelegate<F>);
export declare type RelaxedAssertDelegate<F extends AnyAssertFunc> = (AssertDelegate<TypeOf<F>> & {
    __accepts: CanAcceptOf<F>;
    __canAccept: CanAcceptOf<F>;
});
export declare function relaxed<F extends AnyAssertFunc>(f: F): (RelaxedAssertDelegate<F>);
export declare type EraseCanAcceptAssertDelegate<F extends AnyAssertFunc> = (AssertDelegate<TypeOf<F>> & {
    __accepts: AcceptsOf<F>;
});
export declare function eraseCanAccept<F extends AnyAssertFunc>(f: F): (EraseCanAcceptAssertDelegate<F>);
