import * as sd from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";
import * as myUtil from "./util";

tape("intersect", (t) => {
    //Important to ignore extra variables...
    @sd.ignoreExtraVariables
    class Foo {
        @sd.assert(validation.Number.assertNaturalNumber)
        foo : number = 0;
        @sd.assert(sd.literal("hello", "world"))
        same : "hello"|"world" = "hello";
    }
    //Important to ignore extra variables...
    @sd.ignoreExtraVariables
    class Bar {
        @sd.assert(validation.Number.assertNaturalNumber)
        bar : number = 0;
        @sd.assert(sd.literal("world"))
        same : "world" = "world";
    }
    //Important to ignore extra variables...
    @sd.ignoreExtraVariables
    class Baz {
        @sd.assert(validation.Number.assertNaturalNumber)
        baz : number = 0;
    }

    myUtil.test(t, sd.intersect(Foo), {
        foo : 3,
        same : "hello",
    });
    myUtil.test(t, sd.intersect(Bar), {
        bar : 5,
        same : "world",
    });
    myUtil.test(t, sd.intersect(Baz), {
        baz : 7,
    });
    myUtil.test(t, sd.intersect(Foo, Bar), {
        foo : 3,
        bar : 5,
        same : "world",
    });
    myUtil.test(t, sd.intersect(Foo, Baz), {
        foo : 3,
        baz : 7,
        same : "hello",
    });
    myUtil.test(t, sd.intersect(Bar, Baz), {
        bar : 5,
        baz : 7,
        same : "world",
    });
    myUtil.test(t, sd.intersect(Foo, Bar, Baz), {
        foo : 3,
        bar : 5,
        baz : 7,
        same : "world",
    });
    myUtil.fail(t, sd.intersect(Foo, Bar), {
        foo : 3,
        bar : 5,
        same : "hello",
    });
    myUtil.fail(t, sd.intersect(Foo, Baz), {
        foo : 3,
        same : "hello",
    });
    myUtil.fail(t, sd.intersect(Bar, Baz), {
        baz : 7,
        same : "world",
    });
    myUtil.fail(t, sd.intersect(Foo, Bar, Baz), {
        foo : 3,
        bar : 5,
        baz : "7",
        same : "world",
    });
    t.end();
});

tape(__filename + "-deep", (t) => {
    const a = sd.toSchema2({
        nested : sd.toSchema({
            x : sd.string(),
        })
    });
    const b = sd.toSchema3({
        nested : sd.toSchema2({
            y : sd.array(sd.string()),
            nested2 : sd.toSchema({
                z : sd.number()
            })
        })
    });
    const c = sd.toSchema2({
        nested3 : sd.toSchema({
            w : sd.string(),
        })
    });
    const i = sd.intersect(a, b, c);
    t.deepEquals(
        i(
            "obj",
            {
                nested: {
                    x: "hello",
                    y: ["world", "this"],
                    nested2: {
                        z: 32,
                    },
                },
                nested3: {
                    w: "is a test",
                },
            }
        ),
        {
            nested: {
                x: "hello",
                y: ["world", "this"],
                nested2: {
                    z: 32,
                },
            },
            nested3: {
                w: "is a test",
            },
        }
    );
    const i2 = sd.intersect(b, a, c);
    t.deepEquals(
        i2(
            "obj",
            {
                nested: {
                    x: "hello",
                    y: ["world", "this"],
                    nested2: {
                        z: 32,
                    },
                },
                nested3: {
                    w: "is a test",
                },
            }
        ),
        {
            nested: {
                x: "hello",
                y: ["world", "this"],
                nested2: {
                    z: 32,
                },
            },
            nested3: {
                w: "is a test",
            },
        }
    );
    t.end();
});