import {
    AnyAssertFunc,
    AssertDelegate,
    TypeOf,
    AcceptsOf,
    toAssertDelegateExact,
    CanAcceptOf
} from "../types";

export type CastDelegate<FromT, ToT> = (from : FromT) => ToT;
export type CastAssertDelegate<
    FromF extends AnyAssertFunc,
    ToF extends AnyAssertFunc
> = (
    AssertDelegate<TypeOf<ToF>> &
    {
        //By default, only accept what the destination type accepts.
        //You can call relaxed<>() to accept everything that
        //can be accepted
        __accepts : AcceptsOf<ToF>,
        __canAccept : CanAcceptOf<FromF>|CanAcceptOf<ToF>
    }
);
export function cast<
    FromF extends AnyAssertFunc,
    ToF extends AnyAssertFunc
> (
    canCast : FromF,
    castDelegate : CastDelegate<TypeOf<FromF>, TypeOf<ToF>>,
    assert : ToF
) : (
    CastAssertDelegate<FromF, ToF>
) {
    const canCastDelegate = toAssertDelegateExact(canCast);
    const assertDelegate = toAssertDelegateExact(assert);
    return ((name : string, mixed : any) : TypeOf<ToF> => {
        try {
            //If this works, we are already the desired data type
            return assertDelegate(name, mixed);
        } catch (err) {
            try {
                //Failed. We need to cast.
                const from = canCastDelegate(name, mixed);
                const to = castDelegate(from);
                //One final check
                return assertDelegate(name, to);
            } catch (err2) {
                //Ugh, disgusting; nested try catch
                throw new Error(`(${err.message}) or (${err2.message})`);
            }
        }
    }) as any;
}
export function castFirst<
    FromF extends AnyAssertFunc,
    ToF extends AnyAssertFunc
> (
    canCast : FromF,
    castDelegate : CastDelegate<TypeOf<FromF>, TypeOf<ToF>>,
    assert : ToF
) : (
    CastAssertDelegate<FromF, ToF>
) {
    const canCastDelegate = toAssertDelegateExact(canCast);
    const assertDelegate = toAssertDelegateExact(assert);
    return ((name : string, mixed : any) : TypeOf<ToF> => {
        try {
            //Attempt to cast first
            const from = canCastDelegate(name, mixed);
            const to = castDelegate(from);
            //Check that the result is the desired type
            return assertDelegate(name, to);
        } catch (err) {
            try {
                //We failed to cast, check if the original value is the desired type
                return assertDelegate(name, mixed);
            } catch (err2) {
                //Ugh, disgusting; nested try catch
                throw new Error(`(${err.message}) or (${err2.message})`);
            }
        }
    }) as any;
}