import {
    AnyAssertFunc,
    toAssertDelegateExact,
    TypeOf,
    Field,
    AssertDelegate,
    AcceptsOf,
    CanAcceptOf
} from "../types";
import {CastDelegate, cast} from "./cast";
import {toTypeStr, allowsInstanceOf, isInstanceOf} from "../util";
import {optional, notOptional} from "./missing-value";

Field;

/*
    Use with `and()` or `intersect()`

    const f = rename("x", "y", sd.stringToNaturalNumber())

    f("obj", { x : "34" })              //Gives us { y : 34 }
    f("obj", { y : "34" })              //Gives us { y : 34 }
    f("obj", { x : "34", y : "99" })    //Gives us { y : 99 }
    f("obj", { })                       //Error
*/
export type RenameAssertDelegate<
    FromFieldNameT extends string,
    ToFieldNameT extends string,
    AssertFuncT extends AnyAssertFunc
> = (
    AssertDelegate<{
        [field in ToFieldNameT] : TypeOf<AssertFuncT>
    }> &
    {
        __accepts : (
            { [to in ToFieldNameT]     : AcceptsOf<AssertFuncT> }
        ),
        __canAccept : (
            { [from in FromFieldNameT] : CanAcceptOf<AssertFuncT> } |
            { [to in ToFieldNameT]     : CanAcceptOf<AssertFuncT> }
        )
    } &
    {
        optional : () => (
            AssertDelegate<{
                [field in ToFieldNameT]? : TypeOf<AssertFuncT>|undefined
            }> &
            {
                __accepts : (
                    { [to in ToFieldNameT]?     : AcceptsOf<AssertFuncT>|undefined }
                ),
                __canAccept : (
                    { [from in FromFieldNameT]? : CanAcceptOf<AssertFuncT>|undefined } |
                    { [to in ToFieldNameT]?     : CanAcceptOf<AssertFuncT>|undefined }
                )
            }
        )
    } &
    {
        notOptional : () => (
            AssertDelegate<{
                [field in ToFieldNameT]? : Exclude<TypeOf<AssertFuncT>, undefined>
            }> &
            {
                __accepts : (
                    { [to in ToFieldNameT]?     : Exclude<AcceptsOf<AssertFuncT>, undefined> }
                ),
                __canAccept : (
                    { [from in FromFieldNameT]? : Exclude<CanAcceptOf<AssertFuncT>, undefined> } |
                    { [to in ToFieldNameT]?     : Exclude<CanAcceptOf<AssertFuncT>, undefined> }
                )
            }
        )
    }
);
function renameTo<
    FromFieldNameT extends string,
    ToFieldNameT extends string,
    AssertFuncT extends AnyAssertFunc
> (fromKey : FromFieldNameT, toKey : ToFieldNameT, assert : AssertFuncT) : (
    RenameAssertDelegate<FromFieldNameT, ToFieldNameT, AssertFuncT>
) {
    const d = toAssertDelegateExact(assert);
    const result : AssertDelegate<{
        [field in ToFieldNameT] : TypeOf<AssertFuncT>
    }> = (name : string, mixed : any) : {
        [field in ToFieldNameT] : TypeOf<AssertFuncT>
    } => {
        if (mixed.hasOwnProperty(toKey)) {
            const toValue = mixed[toKey];
            const obj : any = {};
            obj[toKey] = d(
                `${name}.${toKey}`,
                toValue
            );
            return obj;
        } else {
            const fromValue = mixed[fromKey];
            const obj : any = {};
            obj[toKey] = d(
                `[${name}.${fromKey} -> ${name}.${toKey}]`,
                fromValue
            );
            return obj;
        }
    };
    (result as any).optional = () => {
        return rename(fromKey, toKey, optional(d));
    };
    (result as any).notOptional = () => {
        return rename(fromKey, toKey, notOptional(d));
    };
    return result as any;
}
function renameToField<
    FromFieldNameT extends string,
    ToFieldT extends Field<string, any>
> (fromKey : FromFieldNameT, toField : ToFieldT) : (
    RenameAssertDelegate<FromFieldNameT, ToFieldT["name"], TypeOf<ToFieldT>>
) {
    return renameTo(fromKey, toField.name, toField.assertDelegate) as any;
}

export function rename<
    FromFieldNameT extends string,
    ToFieldNameT extends string,
    AssertFuncT extends AnyAssertFunc
> (fromKey : FromFieldNameT, toKey : ToFieldNameT, assert : AssertFuncT) : (
    RenameAssertDelegate<FromFieldNameT, ToFieldNameT, AssertFuncT>
);
export function rename<
    FromFieldNameT extends string,
    ToFieldT extends Field<string, any>
> (fromKey : FromFieldNameT, toField : ToFieldT) : (
    RenameAssertDelegate<FromFieldNameT, ToFieldT["name"], TypeOf<ToFieldT>>
);
export function rename (
    fromKey : string,
    arg0 : any,
    arg1? : any
) {
    if (arg1 == undefined) {
        return renameToField(fromKey, arg0);
    } else {
        return renameTo(fromKey, arg0, arg1);
    }
}
/*
    Use with `and()` or `intersect()`

    const f = deriveFrom(
        "x",
        "y",
        sd.naturalNumberString(),
        parseInt,
        sd.naturalNumber()
    );

    f("obj", { x : "34" })           //Gives us { x : "34", y : 34 }
    f("obj", { x : "34", y : 100 })  //Gives us { x : "34", y : 34 }
    f("obj", { y : 34})              //Error; expected `x` to be string; received undefined
    f("obj", { })                    //Error
*/
//Use `derive()` instead
export function deriveFrom<
    FromFieldNameT extends string,
    ToFieldNameT extends string,
    FromF extends AnyAssertFunc,
    ToF extends AnyAssertFunc
> (
    fromKey : FromFieldNameT,
    toKey : ToFieldNameT,
    canCast : FromF,
    castDelegate : CastDelegate<TypeOf<FromF>, TypeOf<ToF>>,
    assert : ToF
) : (
    AssertDelegate<{
        [field in FromFieldNameT|ToFieldNameT] : (
            field extends FromFieldNameT ?
            TypeOf<FromF> :
            field extends ToFieldNameT ?
            TypeOf<ToF> :
            never
        )
    }> &
    {
        __accepts : {
            [from in FromFieldNameT] : (
                AcceptsOf<FromF>
            )
        },
        __canAccept : {
            [from in FromFieldNameT] : (
                CanAcceptOf<FromF>|CanAcceptOf<ToF>
            )
        }
    }
) {
    const canCastD = toAssertDelegateExact(canCast);
    const castD = cast(canCast, castDelegate, assert);

    const result : AssertDelegate<{
        [field in FromFieldNameT|ToFieldNameT] : (
            field extends FromFieldNameT ?
            TypeOf<FromF> :
            field extends ToFieldNameT ?
            TypeOf<ToF> :
            never
        )
    }> = (name : string, mixed : any) : {
        [field in FromFieldNameT|ToFieldNameT] : (
            field extends FromFieldNameT ?
            TypeOf<FromF> :
            field extends ToFieldNameT ?
            TypeOf<ToF> :
            never
        )
    } => {
        const obj : any = {};

        obj[fromKey] = canCastD(
            `${name}.${fromKey}`,
            mixed[fromKey]
        );

        obj[toKey] = castD(
            `[${name}.${fromKey} > ${name}.${toKey}]`,
            obj[fromKey]
        );
        return obj;
    };
    return result as any;
}

/*
    Use with `and()` or `intersect()`

    //derive<>() can be used to rename fields
    const f = derive("x", "y", sd.stringToNaturalNumber())

    f("obj", { x : "34" })              //Gives us { y : 34 }
    f("obj", { x : "34", y : "99" })    //Gives us { y : 34 }
    f("obj", { y : "34" })              //Error; expected `x` to be string; received undefined
    f("obj", { })                       //Error

    //derive<>() can be used while keeping the old field,
    const f = intersect(
        sd.toSchema({
            x : sd.naturalNumberString()
        }),
        sd.derive("x", "y", sd.stringToNaturalNumber())
    );

    f("obj", { x : "34" })              //Gives us { x : "34", y : 34 }
    f("obj", { x : "34", y : "99" })    //Gives us { x : "34", y : 34 }
    f("obj", { y : "34" })              //Error; expected `x` to be string; received undefined
    f("obj", { })                       //Error
*/
export type DeriveAssertDelegate<
    FromFieldNameT extends string,
    ToFieldNameT extends string,
    AssertFuncT extends AnyAssertFunc
> = (
    AssertDelegate<{
        [field in ToFieldNameT] : TypeOf<AssertFuncT>
    }> &
    {
        __accepts : (
            { [from in FromFieldNameT] : AcceptsOf<AssertFuncT> }
        ),
        __canAccept : (
            { [from in FromFieldNameT] : CanAcceptOf<AssertFuncT> }
        )
    }
);
export function derive<
    FromFieldNameT extends string,
    ToFieldNameT extends string,
    AssertFuncT extends AnyAssertFunc
> (fromKey : FromFieldNameT, toKey : ToFieldNameT, assert : AssertFuncT) : (
    DeriveAssertDelegate<
        FromFieldNameT,
        ToFieldNameT,
        AssertFuncT
    >
) {
    const d = toAssertDelegateExact(assert);
    const result : AssertDelegate<{
        [field in ToFieldNameT] : TypeOf<AssertFuncT>
    }> = (name : string, mixed : any) : {
        [field in ToFieldNameT] : TypeOf<AssertFuncT>
    } => {
        const obj : any = {};
        obj[toKey] = d(
            `[${name}.${fromKey} >> ${name}.${toKey}]`,
            mixed[fromKey]
        );
        return obj;
    };
    return result as any;
}

export function instanceOf<T> (ctor : new (...args : any[]) => T) : (
    AssertDelegate<T> &
    {
        __accepts : T,
        __canAccept : T,
    }
) {
    if (!allowsInstanceOf(ctor)) {
        throw new Error(`instanceof check not allowed on ${ctor.name}`);
    }
    const result : AssertDelegate<T> = (name : string, mixed : unknown) : T => {
        if (isInstanceOf(mixed, ctor)) {
            return mixed;
        } else {
            throw new Error(`Expected ${name} to be an instance of ${ctor.name}; found ${toTypeStr(mixed)}`);
        }
    };
    return result as any;
}

export function dictionary<F extends AnyAssertFunc> (assert : F) : (
    AssertDelegate<{
        [key : string] : TypeOf<F>
    }> &
    {
        __accepts : {
            [key : string] : AcceptsOf<F>
        },
        __canAccept : {
            [key : string] : CanAcceptOf<F>
        }
    }
) {
    const assertDelegate = toAssertDelegateExact(assert);
    const result : AssertDelegate<{
        [key : string] : TypeOf<F>
    }> = (name : string, mixed : unknown) => {
        if (
            !(mixed instanceof Object) ||
            (mixed instanceof Date) ||
            (mixed instanceof Array) ||
            (mixed instanceof Function)
        ) {
            throw new Error(`Expected ${name} to be an dictionary object, received ${toTypeStr(mixed)}`);
        }
        const keys = Object.keys(mixed);
        const obj : any = {};
        for (let k of keys) {
            obj[k] = assertDelegate(`${name}[${k}]`, (mixed as any)[k])
        }
        return obj;
    };
    return result as any;
}

export function emptyObject () : (
    AssertDelegate<{}> &
    {
        __accepts : {},
        __canAccept : {}
    }
) {
    const result : AssertDelegate<{}> = (name : string, mixed : unknown) => {
        if (
            !(mixed instanceof Object) ||
            (mixed instanceof Date) ||
            (mixed instanceof Array) ||
            (mixed instanceof Function)
        ) {
            throw new Error(`Expected ${name} to be an empty object, received ${toTypeStr(mixed)}`);
        }
        const keys = Object.keys(mixed);
        if (keys.length != 0) {
            //Didn't find an empty key; create and return an empty object
            return {};
            //throw new Error(`Expected ${name} to be an empty object, found keys ${keys.join(", ")}`);
        }
        return mixed;
    };
    return result as any;
}