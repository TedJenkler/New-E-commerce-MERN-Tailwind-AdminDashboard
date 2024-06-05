import * as sd from "../../main/index";
import * as tape from "tape";
import * as myUtil from "./util";

tape("basic-to-schema", (t) => {
    const Fields = sd.fields({
        x : sd.naturalNumber(),
        y : sd.string()
    });

    const Foo = sd.toSchema(Fields);

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
tape("inheritance-to-schema", (t) => {
    const Fields = sd.fields({
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    });

    const Foo = sd.toSchema({
        x : Fields.x,
        y : Fields.y
    });
    const Derived = sd.intersect(
        Foo,
        sd.toSchema({
            z : Fields.z
        })
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
tape("or-to-schema", (t) => {
    const Fields = sd.fields({
        z : sd.boolean(),
        d : sd.date(),
    })

    const Foo = sd.toSchema({
        x : sd.naturalNumber(),
        y : sd.string(),
    });
    const Bar = sd.toSchema(Fields);
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
tape("optional-to-schema", (t) => {
    const Fields = sd.fields({
        x : sd.naturalNumber(),
        y : sd.string(),
    });

    const Foo = sd.toSchema({
        x : Fields.x,
        y : Fields.y.optional()
    });

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
tape("rename-to-schema", (t) => {
    const Fields = sd.fields({
        thisIsAName : sd.naturalNumber(),
        thisIsAnotherName : sd.string()
    });

    const Foo = sd.toSchema({
        x : Fields.thisIsAName,
        y : Fields.thisIsAnotherName,
    });

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

tape(__filename + "-should-not-be-assignable-statically", (t) => {
    const schema = sd.toSchema({
        required : sd.string(),
        optional : sd.optional(sd.number())
    });
    /*
    const errorCase : {
        required : string,
        optional? : boolean
    } = schema("errorCase", {
        required : "required",
        optional : 34
    });
    //*/
    const passingCase : {
        required : string,
        optional? : number
    } = schema("passingCase", {
        required : "required",
        optional : 34
    });
    t.deepEquals(passingCase, { required : "required", optional : 34 });

    t.end();
});