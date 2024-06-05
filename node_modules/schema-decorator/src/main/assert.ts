import {
    AnyAssertFunc,
    toAssertDelegateExact,
    Field
} from "./types";
import * as myUtil from "./util";

Field; //For implicit type inference

export function assert<F extends AnyAssertFunc> (assert : F) {
    const assertDelegate = toAssertDelegateExact(assert);
    return (target : Object, propertyKey : string | symbol) : void => {
        const propertyName = (typeof propertyKey == "string") ?
            propertyKey : `Symbol(${propertyKey.toString()})`;
        const privateName = `____hijacked-by-schema-decorator-${propertyName}`;

        const superAccessorGenerator = myUtil.getAccessor(target, propertyKey);
        Object.defineProperty(target, propertyKey, {
            get : function (this : any) {
                return this[privateName];
            },
            set : function (this : any, mixed : any) {
                //If we are here, we have the accessor defined on the class prototype,
                //but not on the instance itself.
                //We want to preserve the behaviour of Object.keys(),
                //So, we need to define the accessor on the instance.

                let superSetter : undefined|((v: any) => void) = undefined;
                if (superAccessorGenerator != undefined && superAccessorGenerator.set != undefined) {
                    superAccessorGenerator.set.bind(this)(mixed);
                    const accessor = Object.getOwnPropertyDescriptor(this, propertyKey);
                    if (!myUtil.isAccessorDescriptor(accessor) || accessor.set == undefined) {
                        throw new Error(`Expected ${propertyKey.toString()} to be an accessor and have a "set()" method`);
                    }
                    superSetter = accessor.set.bind(this);
                }

                //Set the value on the instance first,
                //We define a property that is not enumerable,
                //So it does not show up in Object.keys().
                //We don't want this property to show up because
                //its name is `privateName`, not the "original" name.
                if (superSetter == undefined) {
                    Object.defineProperty(this, privateName, {
                        value : assertDelegate(propertyName, mixed),
                        writable : true,
                        enumerable : false,
                    });
                } else {
                    superSetter(assertDelegate(propertyName, mixed));
                }
                //We define the accessor that should be used from now on
                //And will be enumerable with Object.keys(instance)
                Object.defineProperty(this, propertyName, {
                    get : function (this : any) {
                        return this[privateName];
                    },
                    set : function (this : any, mixed : any) {
                        if (superSetter == undefined) {
                            this[privateName] = assertDelegate(propertyName, mixed);
                        } else {
                            superSetter(assertDelegate(propertyName, mixed));
                        }
                    },
                    enumerable : true,
                    configurable : true,
                });
            },
            enumerable : true,
        });
    };
}