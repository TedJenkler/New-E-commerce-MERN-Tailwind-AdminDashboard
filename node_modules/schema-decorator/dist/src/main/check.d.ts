import { AnyAssertFunc, AcceptsOf, TypeOf } from "./types";
export declare function check<F extends AnyAssertFunc>(f: F, name: string, mixed: AcceptsOf<F>): TypeOf<F>;
export declare function isOptional(assert: AnyAssertFunc): boolean;
export declare function isNullable(assert: AnyAssertFunc): boolean;
export declare function isMaybe(assert: AnyAssertFunc): boolean;
export declare function isOfType<F extends AnyAssertFunc>(assert: F, mixed: unknown): mixed is TypeOf<F>;
