"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
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
class LazyNested {
    constructor() {
        this.ctor = undefined;
        this.delegate = undefined;
        this.assert = (name, mixed) => {
            if (this.delegate == null) {
                if (this.ctor == null) {
                    throw new Error("Called LazyNested.assert() before calling setCtor() or setDelegate()");
                }
                this.delegate = types_1.nested(this.ctor);
            }
            return this.delegate(name, mixed);
        };
    }
    setCtor(ctor) {
        this.ctor = ctor;
    }
    setDelegate(delegate) {
        this.delegate = delegate;
    }
}
exports.LazyNested = LazyNested;
//# sourceMappingURL=LazyNested.js.map