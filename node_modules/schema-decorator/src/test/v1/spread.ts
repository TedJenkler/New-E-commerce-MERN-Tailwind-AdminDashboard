import * as schema from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";
import * as myUtil from "./util";

tape("basic-spread", (t) => {
    class Foo {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
    }
    const foo = new Foo();
    myUtil.test(t, Foo, foo, {
        var : 0
    });
    foo.var = 3;
    myUtil.test(t, Foo, foo, {
        var : 3
    });
    const copy = {
        ...foo
    };
    myUtil.test(t, Foo, foo, {
        var : 3
    });
    myUtil.test(t, Foo, copy, {
        var : 3
    });
    foo.var = 4;
    myUtil.test(t, Foo, foo, {
        var : 4
    });
    myUtil.test(t, Foo, copy, {
        var : 3
    });
    copy.var = 5;
    myUtil.test(t, Foo, foo, {
        var : 4
    });
    myUtil.test(t, Foo, copy, {
        var : 5
    });
    t.end();
});
tape("inheritance-spread", (t) => {
    class Base {
        @schema.assert(schema.integer())
        var : number = 0;
    }
    class Foo extends Base {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
    }
    const foo = new Foo();
    myUtil.test(t, Foo, foo, {
        var : 0
    });
    foo.var = 3;
    myUtil.test(t, Foo, foo, {
        var : 3
    });
    const copy = {
        ...foo
    };
    myUtil.test(t, Foo, foo, {
        var : 3
    });
    myUtil.test(t, Foo, copy, {
        var : 3
    });
    foo.var = 4;
    myUtil.test(t, Foo, foo, {
        var : 4
    });
    myUtil.test(t, Foo, copy, {
        var : 3
    });
    copy.var = 5;
    myUtil.test(t, Foo, foo, {
        var : 4
    });
    myUtil.test(t, Foo, copy, {
        var : 5
    });
    t.end();
});
