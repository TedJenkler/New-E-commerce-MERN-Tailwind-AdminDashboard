import * as schema from "../../main/index";
import * as tape from "tape";
import * as myUtil from "./util";

tape("circular", (t) => {
    const lazyB = new schema.LazyNested<B>();
    class A {
        @schema.assert(schema.maybe(lazyB.assert))
        b? : B;
        @schema.assert(schema.string())
        str : string = "Hi";
    }
    class B {
        @schema.assert(schema.maybe(schema.nested(A)))
        a? : A;
        @schema.assert(schema.naturalNumber())
        num : number = 3;
    }
    lazyB.setCtor(B);

    myUtil.test(t, A, {
        str : "Hello",
    });
    myUtil.test(t, A, {
        str : "Hello",
        b : {
            num : 3,
        },
    });
    myUtil.test(t, A, {
        str : "Hello",
        b : {
            num : 3,
            a : {
                str : "World",
            },
        },
    });
    myUtil.test(t, B, {
        num : 3,
    });
    myUtil.test(t, B, {
        num : 3,
        a : {
            str : "Hey",
        },
    });
    myUtil.test(t, B, {
        num : 3,
        a : {
            str : "Hey",
            b : {
                num : 9001,
            },
        },
    });
    t.end();
});
