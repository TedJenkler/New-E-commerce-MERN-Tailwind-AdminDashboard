import * as sd from "../../main/index";
import * as tape from "tape";
import * as myUtil from "./util";

tape("basic-to-schema", (t) => {
    const Fields = sd.fields({
        x : sd.naturalNumber(),
        y : sd.string()
    });

    const Foo = sd.toPartialSchema(Fields);

    myUtil.pass(t, Foo, {
        x : 3,
        y : "Hello, world!"
    });
    myUtil.pass(t, Foo, {
        x : 3,
        y : "Hello, world!",
        extraStuffIsOkay : true,
    });
    myUtil.fail(t, Foo, {
        x : 3.1,
        y : "Hello, world!"
    });
    myUtil.fail(t, Foo, {
        x : 3.1,
        y : 6
    });
    myUtil.pass(t, Foo, {
        x : undefined,
        y : "Hello, world!"
    });
    myUtil.fail(t, Foo, {
        x : 3.1,
        y : undefined
    });
    myUtil.pass(t, Foo, {
    });
    myUtil.fail(t, Foo, {
        x : "3",
        y : "Hello, world!",
    });
    myUtil.fail(t, Foo, {
        x : "3.1",
        y : "Hello, world!",
    });
    myUtil.fail(t, Foo, {
        x : true,
        y : "Hello, world!",
    });
    myUtil.fail(t, Foo, {
        x : "3",
        y : new Date(),
    });
    myUtil.fail(t, Foo, new Date());

    t.end();
});