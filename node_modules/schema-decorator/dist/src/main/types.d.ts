import { StrictAssertDelegate, RelaxedAssertDelegate } from "./strict";
export declare type AssertDelegate<T> = (name: string, mixed: unknown) => T;
export declare type AssertDelegateAccepts<T, AcceptsT = unknown> = (((name: string, mixed: unknown) => T) & {
    __accepts: AcceptsT;
});
export declare type ChainedAssertDelegate<T, AcceptsT = any> = ((name: string, accepts: AcceptsT) => T);
export declare type AssertDelegateCanAccept<T, CanAcceptT = unknown> = (((name: string, mixed: unknown) => T) & {
    __canAccept: CanAcceptT;
});
export declare type Accepts<AcceptsT> = ({
    __accepts: AcceptsT;
});
export declare type CanAccept<CanAcceptT> = ({
    __canAccept: CanAcceptT;
});
export declare type Constructor<T> = {
    new (): T;
};
export declare type AssertFunc<T> = (Constructor<T> | AssertDelegateAccepts<T> | AssertDelegate<T> | Field<string, (Constructor<T> | AssertDelegateAccepts<T> | AssertDelegate<T> | Field<string, (Constructor<T> | AssertDelegateAccepts<T> | AssertDelegate<T> | Field<string, (Constructor<T> | AssertDelegateAccepts<T> | AssertDelegate<T>)>)>)>);
export declare type AnyAssertFunc = AssertFunc<any>;
export declare type ChainedAssertFunc<AcceptsT> = (Constructor<AcceptsT> | AssertDelegateAccepts<any, AcceptsT> | AssertDelegate<AcceptsT> | ChainedAssertDelegate<any, AcceptsT> | Field<string, (Constructor<AcceptsT> | AssertDelegateAccepts<any, AcceptsT> | AssertDelegate<AcceptsT> | Field<string, (Constructor<AcceptsT> | AssertDelegateAccepts<any, AcceptsT> | AssertDelegate<AcceptsT> | Field<string, (Constructor<AcceptsT> | AssertDelegateAccepts<any, AcceptsT> | AssertDelegate<AcceptsT>)>)>)>);
export declare type AnyChainedAssertFunc = ChainedAssertFunc<any>;
export declare type TypeOf<F extends AnyAssertFunc | ChainedAssertDelegate<any>> = (F extends Constructor<infer T> ? T : F extends AssertDelegateAccepts<infer T> ? T : F extends AssertDelegate<infer T> ? T : F extends ChainedAssertDelegate<infer T> ? T : F extends Field<string, infer F2> ? (F2 extends Constructor<infer T> ? T : F2 extends AssertDelegateAccepts<infer T> ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends Field<string, infer F3> ? (F3 extends Constructor<infer T> ? T : F3 extends AssertDelegateAccepts<infer T> ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends Field<string, infer F4> ? (F4 extends Constructor<infer T> ? T : F4 extends AssertDelegateAccepts<infer T> ? T : F4 extends AssertDelegate<infer T> ? T : never) : never) : never) : never);
export declare type UnsafeTypeOf<F> = (F extends Constructor<infer T> ? T : F extends AssertDelegateAccepts<infer T> ? T : F extends AssertDelegate<infer T> ? T : F extends ChainedAssertDelegate<infer T> ? T : F extends Field<string, infer F2> ? (F2 extends Constructor<infer T> ? T : F2 extends AssertDelegateAccepts<infer T> ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends Field<string, infer F3> ? (F3 extends Constructor<infer T> ? T : F3 extends AssertDelegateAccepts<infer T> ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends Field<string, infer F4> ? (F4 extends Constructor<infer T> ? T : F4 extends AssertDelegateAccepts<infer T> ? T : F4 extends AssertDelegate<infer T> ? T : never) : never) : never) : never);
export declare type AcceptsOf<F extends AnyAssertFunc | ChainedAssertDelegate<any>> = (F extends Constructor<infer T> ? T : F extends AssertDelegateAccepts<any> ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends ChainedAssertDelegate<any, infer AcceptsT> ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__accepts"] : never);
export declare type UnsafeAcceptsOf<F> = (F extends Constructor<infer T> ? T : F extends AssertDelegateAccepts<any> ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends ChainedAssertDelegate<any, infer AcceptsT> ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__accepts"] : never);
export declare type CanAcceptOf<F extends AnyAssertFunc | ChainedAssertDelegate<any>> = (F extends Constructor<infer T> ? T : F extends AssertDelegateCanAccept<any> ? F["__canAccept"] : F extends AssertDelegateAccepts<any> ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends ChainedAssertDelegate<any, infer AcceptsT> ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__canAccept"] : never);
export declare type UnsafeCanAcceptOf<F> = (F extends Constructor<infer T> ? T : F extends AssertDelegateCanAccept<any> ? F["__canAccept"] : F extends AssertDelegateAccepts<any> ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends ChainedAssertDelegate<any, infer AcceptsT> ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__canAccept"] : never);
export declare type ToAssertDelegate<F extends AnyAssertFunc> = (AssertDelegate<TypeOf<F>> & {
    __accepts: AcceptsOf<F>;
    __canAccept: CanAcceptOf<F>;
});
export declare class Field<NameT extends string, F extends AnyAssertFunc> {
    readonly name: NameT;
    readonly assert: F;
    readonly assertDelegate: ToAssertDelegate<F>;
    constructor(name: NameT, assert: F);
    maybe(): Field<NameT, AssertDelegate<(F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: any) => infer T ? T : F extends Field<string, infer F2> ? F2 extends Constructor<infer T> ? T : F2 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends Field<string, infer F3> ? F3 extends Constructor<infer T> ? T : F3 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends Field<string, infer F4> ? F4 extends Constructor<infer T> ? T : F4 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F4 extends AssertDelegate<infer T> ? T : never : never : never : never) | null | undefined> & {
        __accepts: (F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => any) & {
            __accepts: unknown;
        } ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: infer AcceptsT) => any ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__accepts"] : never) | null | undefined;
        __canAccept: (F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => any) & {
            __canAccept: unknown;
        } ? F["__canAccept"] : F extends ((name: string, mixed: unknown) => any) & {
            __accepts: unknown;
        } ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: infer AcceptsT) => any ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__canAccept"] : never) | null | undefined;
    }>;
    optional(): Field<NameT, AssertDelegate<(F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: any) => infer T ? T : F extends Field<string, infer F2> ? F2 extends Constructor<infer T> ? T : F2 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends Field<string, infer F3> ? F3 extends Constructor<infer T> ? T : F3 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends Field<string, infer F4> ? F4 extends Constructor<infer T> ? T : F4 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F4 extends AssertDelegate<infer T> ? T : never : never : never : never) | undefined> & {
        __accepts: (F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => any) & {
            __accepts: unknown;
        } ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: infer AcceptsT) => any ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__accepts"] : never) | undefined;
        __canAccept: (F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => any) & {
            __canAccept: unknown;
        } ? F["__canAccept"] : F extends ((name: string, mixed: unknown) => any) & {
            __accepts: unknown;
        } ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: infer AcceptsT) => any ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__canAccept"] : never) | undefined;
    }>;
    nullable(): Field<NameT, AssertDelegate<(F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: any) => infer T ? T : F extends Field<string, infer F2> ? F2 extends Constructor<infer T> ? T : F2 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends Field<string, infer F3> ? F3 extends Constructor<infer T> ? T : F3 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends Field<string, infer F4> ? F4 extends Constructor<infer T> ? T : F4 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F4 extends AssertDelegate<infer T> ? T : never : never : never : never) | null> & {
        __accepts: (F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => any) & {
            __accepts: unknown;
        } ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: infer AcceptsT) => any ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__accepts"] : never) | null;
        __canAccept: (F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => any) & {
            __canAccept: unknown;
        } ? F["__canAccept"] : F extends ((name: string, mixed: unknown) => any) & {
            __accepts: unknown;
        } ? F["__accepts"] : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: infer AcceptsT) => any ? AcceptsT : F extends Field<string, any> ? F["assertDelegate"]["__canAccept"] : never) | null;
    }>;
    notMaybe(): Field<NameT, AssertDelegate<Exclude<F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: any) => infer T ? T : F extends Field<string, infer F2> ? F2 extends Constructor<infer T> ? T : F2 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends Field<string, infer F3> ? F3 extends Constructor<infer T> ? T : F3 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends Field<string, infer F4> ? F4 extends Constructor<infer T> ? T : F4 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F4 extends AssertDelegate<infer T> ? T : never : never : never : never, null | undefined>>>;
    notOptional(): Field<NameT, AssertDelegate<Exclude<F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: any) => infer T ? T : F extends Field<string, infer F2> ? F2 extends Constructor<infer T> ? T : F2 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends Field<string, infer F3> ? F3 extends Constructor<infer T> ? T : F3 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends Field<string, infer F4> ? F4 extends Constructor<infer T> ? T : F4 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F4 extends AssertDelegate<infer T> ? T : never : never : never : never, undefined>>>;
    notNullable(): Field<NameT, AssertDelegate<Exclude<F extends Constructor<infer T> ? T : F extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F extends AssertDelegate<infer T> ? T : F extends (name: string, accepts: any) => infer T ? T : F extends Field<string, infer F2> ? F2 extends Constructor<infer T> ? T : F2 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F2 extends AssertDelegate<infer T> ? T : F2 extends Field<string, infer F3> ? F3 extends Constructor<infer T> ? T : F3 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F3 extends AssertDelegate<infer T> ? T : F3 extends Field<string, infer F4> ? F4 extends Constructor<infer T> ? T : F4 extends ((name: string, mixed: unknown) => infer T) & {
        __accepts: unknown;
    } ? T : F4 extends AssertDelegate<infer T> ? T : never : never : never : never, null>>>;
    strict(): Field<NameT, StrictAssertDelegate<F>>;
    relaxed(): Field<NameT, RelaxedAssertDelegate<F>>;
    withName<NewNameT extends string>(name: NewNameT): Field<NewNameT, F>;
    withAssert<NewTypeT>(assert: AssertFunc<NewTypeT>): Field<NameT, Constructor<NewTypeT> | (((name: string, mixed: unknown) => NewTypeT) & {
        __accepts: unknown;
    }) | AssertDelegate<NewTypeT> | Field<string, Constructor<NewTypeT> | (((name: string, mixed: unknown) => NewTypeT) & {
        __accepts: unknown;
    }) | AssertDelegate<NewTypeT> | Field<string, Constructor<NewTypeT> | (((name: string, mixed: unknown) => NewTypeT) & {
        __accepts: unknown;
    }) | AssertDelegate<NewTypeT> | Field<string, Constructor<NewTypeT> | (((name: string, mixed: unknown) => NewTypeT) & {
        __accepts: unknown;
    }) | AssertDelegate<NewTypeT>>>>>;
    assertType(name: string, mixed: any): TypeOf<F>;
    assertType(mixed: any): TypeOf<F>;
}
export declare type AnyField = Field<any, any>;
export declare function nested<T>(ctor: Constructor<T>): (AssertDelegate<T> & {
    __accepts: T;
});
export declare function nestedExact<T>(ctor: Constructor<T>): (AssertDelegate<T> & {
    __accepts: T;
});
export declare function isCtor<T>(assertFunc: AssertFunc<T>): assertFunc is Constructor<T>;
export declare function toAssertDelegate<F extends AnyAssertFunc>(assertFunc: F): ToAssertDelegate<F>;
export declare function toAssertDelegateExact<F extends AnyAssertFunc>(assertFunc: F): ToAssertDelegate<F>;
export declare type Chainable<FromT extends any, ToF extends AnyAssertFunc | ChainedAssertDelegate<any>> = (FromT extends AnyAssertFunc | ChainedAssertDelegate<any> ? (TypeOf<FromT> extends CanAcceptOf<ToF> ? true : (CanAcceptOf<ToF> extends TypeOf<FromT> ? true : false)) : FromT extends CanAcceptOf<ToF> ? true : (CanAcceptOf<ToF> extends FromT ? true : false));
