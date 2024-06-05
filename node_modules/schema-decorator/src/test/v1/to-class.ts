import * as schema from "../../main/index";
import * as tape from "tape";

tape("from-class-to-class", (t) => {
    class Bar {
        @schema.assert(schema.naturalNumber())
        var : number = 0;
    }
    class Foo {
        @schema.assert(schema.naturalNumber())
        var : number = 0;
    }
    class Baz {
        @schema.assert(schema.naturalNumber())
        var : number = 0;
        @schema.assert(schema.naturalNumber())
        var2 : number = 0;
    }
    class Invalid {
        @schema.assert(schema.naturalNumber())
        var : string = "lol";
    }
    try {
        schema.toClass("run-time error", new Bar(), Baz);
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err.message);
    }
    try {
        schema.toClass("run-time error", new Baz(), Bar);
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err.message);
    }
    const bar = new Bar();
    bar.var = 99;
    console.log(schema.toClass("ok", bar, Foo));
    t.pass("Converted Bar to Foo");
    console.log(schema.toClass("ok", { var : 2 }, Foo));
    t.pass("Converted object to Foo");
    try {
        schema.toClass("run-time error", { var : "hi" }, Invalid);
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err.message);
    }
    t.end();
});
