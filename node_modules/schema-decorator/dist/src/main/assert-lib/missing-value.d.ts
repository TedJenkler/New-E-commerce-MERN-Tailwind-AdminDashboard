import { AnyAssertFunc, AssertDelegate, TypeOf, AcceptsOf, CanAcceptOf } from "../types";
export declare type Optional<F extends AnyAssertFunc> = (AssertDelegate<TypeOf<F> | undefined> & {
    __accepts: AcceptsOf<F> | undefined;
    __canAccept: CanAcceptOf<F> | undefined;
});
export declare function optional<F extends AnyAssertFunc>(assert: F): Optional<F>;
export declare type Nullable<F extends AnyAssertFunc> = (AssertDelegate<TypeOf<F> | null> & {
    __accepts: AcceptsOf<F> | null;
    __canAccept: CanAcceptOf<F> | null;
});
export declare function nullable<F extends AnyAssertFunc>(assert: F): Nullable<F>;
export declare type Maybe<F extends AnyAssertFunc> = (AssertDelegate<TypeOf<F> | null | undefined> & {
    __accepts: AcceptsOf<F> | null | undefined;
    __canAccept: CanAcceptOf<F> | null | undefined;
});
export declare function maybe<F extends AnyAssertFunc>(assert: F): Maybe<F>;
export declare function notOptional<F extends AnyAssertFunc>(assert: F): AssertDelegate<Exclude<F extends import("../types").Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: any) => infer T ? T : F extends import("../types").Field<string, infer F2> ? F2 extends import("../types").Constructor<infer T> ? T : F2 extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends import("../types").Field<string, infer F3> ? F3 extends import("../types").Constructor<infer T> ? T : F3 extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends import("../types").Field<string, infer F4> ? F4 extends import("../types").Constructor<infer T> ? T : F4 extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F4 extends AssertDelegate<infer T> ? T : never : never : never : never, undefined>>;
export declare function notNullable<F extends AnyAssertFunc>(assert: F): AssertDelegate<Exclude<F extends import("../types").Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: any) => infer T ? T : F extends import("../types").Field<string, infer F2> ? F2 extends import("../types").Constructor<infer T> ? T : F2 extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends import("../types").Field<string, infer F3> ? F3 extends import("../types").Constructor<infer T> ? T : F3 extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends import("../types").Field<string, infer F4> ? F4 extends import("../types").Constructor<infer T> ? T : F4 extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F4 extends AssertDelegate<infer T> ? T : never : never : never : never, null>>;
export declare function notMaybe<F extends AnyAssertFunc>(assert: F): AssertDelegate<Exclude<F extends import("../types").Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: any) => infer T ? T : F extends import("../types").Field<string, infer F2> ? F2 extends import("../types").Constructor<infer T> ? T : F2 extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends import("../types").Field<string, infer F3> ? F3 extends import("../types").Constructor<infer T> ? T : F3 extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends import("../types").Field<string, infer F4> ? F4 extends import("../types").Constructor<infer T> ? T : F4 extends ((name: string, mixed: unknown) => infer T) & {
    __accepts: unknown;
} ? T : F4 extends AssertDelegate<infer T> ? T : never : never : never : never, null | undefined>>;
