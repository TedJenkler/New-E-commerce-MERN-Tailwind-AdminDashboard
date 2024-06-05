import * as sd from "../../main/index";
import * as tape from "tape";
import * as myUtil from "./util";

tape("basic-schema", (t) => {
    const x = sd.field("x", sd.naturalNumber());
    const y = sd.field("y", sd.string());

    const Foo = sd.schema(
        x,
        y
    );

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
    myUtil.fail(t, Foo, {
        x : undefined,
        y : "Hello, world!"
    });
    myUtil.fail(t, Foo, {
        x : 3.1,
        y : undefined
    });
    myUtil.fail(t, Foo, {
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
tape("inheritance-schema", (t) => {
    const x = sd.field("x", sd.naturalNumber());
    const y = sd.field("y", sd.string());
    const z = sd.field("z", sd.boolean());

    const Foo = sd.schema(
        x,
        y
    );
    const Derived = sd.intersect(
        Foo,
        sd.schema(
            z
        )
    );

    myUtil.pass(t, Derived, {
        x : 3,
        y : "Hello, world!",
        z : true,
    });
    myUtil.pass(t, Derived, {
        x : 3,
        y : "Hello, world!",
        z : true,
        extraStuffIsOkay : true,
    });
    myUtil.fail(t, Derived, {
        x : 3,
        y : "Hello, world!",
        z : 1
    });
    t.end();
});
tape("or-schema", (t) => {
    const x = sd.field("x", sd.naturalNumber());
    const y = sd.field("y", sd.string());
    const z = sd.field("z", sd.boolean());
    const d = sd.field("d", sd.date());

    const Foo = sd.schema(
        x,
        y
    );
    const Bar = sd.schema(
        z,
        d
    );
    const FooOrBar = sd.or(Foo, Bar);

    myUtil.pass(t, FooOrBar, {
        x : 3,
        y : "Hello, world!",
    });
    myUtil.pass(t, FooOrBar, {
        z : true,
        d : new Date(),
    });
    myUtil.pass(t, FooOrBar, {
        x : 3,
        y : "Hello, world!",
        extraStuffIsOkay : true,
    });
    myUtil.pass(t, FooOrBar, {
        z : true,
        d : new Date(),
        extraStuffIsOkay : true,
    });
    myUtil.fail(t, FooOrBar, {
        x : 3,
        z : 1,
    });
    t.end();
});
tape("optional-field-schema", (t) => {
    const x = sd.field("x", sd.naturalNumber());
    const y = sd.field("y", sd.string());

    const Foo = sd.schema(
        x,
        y.optional()
    );

    myUtil.pass(t, Foo, {
        x : 3,
        y : undefined
    });
    myUtil.pass(t, Foo, {
        x : 3,
        y : undefined,
        extraStuffIsOkay : true,
    });
    myUtil.fail(t, Foo, {
        x : 3,
        y : null,
    });
    myUtil.fail(t, Foo, {
        x : 3.1,
        y : "Hello, world!"
    });
    myUtil.fail(t, Foo, {
        x : 3.1,
        y : 6
    });
    myUtil.fail(t, Foo, {
        x : undefined,
        y : "Hello, world!"
    });
    myUtil.fail(t, Foo, {
        x : 3.1,
        y : undefined
    });
    myUtil.fail(t, Foo, {
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
