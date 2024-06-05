import {nested} from "./types";
import {AssertDelegate} from "./types";

/*
    Used when you want to assert the type of circularly referencing nested classes.

    class A {
        assert(maybe(nested(B))) //Error: Using B's ctor before it is declared
        b? : B;
    }
    class B {
        assert(maybe(nested(A))) //OK
        a? : A;
    }

    Fix:

    const lazyB = new LazyNested<B>();

    class A {
        assert(maybe(lazyB.assert)) //OK, if you call lazyB.setCtor() before this gets called
        b? : B;
    }
    class B {
        assert(maybe(nested(A))) //OK
        a? : A;
    }
    lazyB.setCtor(B); //This completes our set up
*/
export class LazyNested<T> {
    private ctor : undefined|{new():T} = undefined;
    private delegate : undefined|AssertDelegate<T> = undefined;
    public constructor () {
    }
    public setCtor (ctor : {new():T}) {
        this.ctor = ctor;
    }
    public setDelegate (delegate : AssertDelegate<T>) {
        this.delegate = delegate;
    }
    public assert = (name : string, mixed : any) : T => {
        if (this.delegate == null) {
            if (this.ctor == null) {
                throw new Error("Called LazyNested.assert() before calling setCtor() or setDelegate()");
            }
            this.delegate = nested(this.ctor);
        }
        return this.delegate(name, mixed);
    };
}
