import { AnyAssertFunc, AssertDelegate, TypeOf, AcceptsOf, CanAcceptOf } from "../types";
export declare type CastDelegate<FromT, ToT> = (from: FromT) => ToT;
export declare type CastAssertDelegate<FromF extends AnyAssertFunc, ToF extends AnyAssertFunc> = (AssertDelegate<TypeOf<ToF>> & {
    __accepts: AcceptsOf<ToF>;
    __canAccept: CanAcceptOf<FromF> | CanAcceptOf<ToF>;
});
export declare function cast<FromF extends AnyAssertFunc, ToF extends AnyAssertFunc>(canCast: FromF, castDelegate: CastDelegate<TypeOf<FromF>, TypeOf<ToF>>, assert: ToF): (CastAssertDelegate<FromF, ToF>);
export declare function castFirst<FromF extends AnyAssertFunc, ToF extends AnyAssertFunc>(canCast: FromF, castDelegate: CastDelegate<TypeOf<FromF>, TypeOf<ToF>>, assert: ToF): (CastAssertDelegate<FromF, ToF>);
