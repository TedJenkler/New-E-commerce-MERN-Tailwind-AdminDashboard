import { AnyAssertFunc, AssertDelegate, TypeOf, AcceptsOf, CanAcceptOf } from "../types";
export declare type ArrayAssertDelegate<F extends AnyAssertFunc> = (AssertDelegate<TypeOf<F>[]> & {
    __accepts: AcceptsOf<F>[];
    __canAccept: CanAcceptOf<F>[];
});
export declare function array<F extends AnyAssertFunc>(assert: F): (ArrayAssertDelegate<F>);
