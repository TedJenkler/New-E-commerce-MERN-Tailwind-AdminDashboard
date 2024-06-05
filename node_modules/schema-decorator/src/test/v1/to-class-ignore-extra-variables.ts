import * as schema from "../../main/index";
import * as tape from "tape";

tape("from-class-to-class-ignore-extra-variables", (t) => {
    @schema.ignoreExtraVariables
    class Bar {
        @schema.assert(schema.naturalNumber())
        var : number = 0;
    }
    @schema.ignoreExtraVariables
    class Foo {
        @schema.assert(schema.naturalNumber())
        var2 : number = 0;
    }
    class Baz {
        @schema.assert(schema.naturalNumber())
        var : number = 0;
        @schema.assert(schema.naturalNumber())
        var2 : number = 0;
    }
    const bar = schema.toClass("ok", new Baz(), Bar);
    console.log(bar);
    t.equals(bar instanceof Bar, true);
    t.deepEquals(Object.keys(bar), ["var"]);
    t.deepEquals(JSON.stringify(bar), JSON.stringify({ var : 0 }));
    t.pass("Converted Baz to Bar, ignoring extra variables");
    const foo = schema.toClass("ok", new Baz(), Foo);
    console.log(foo);
    t.equals(foo instanceof Foo, true);
    t.deepEquals(Object.keys(foo), ["var2"]);
    t.deepEquals(JSON.stringify(foo), JSON.stringify({ var2 : 0 }));
    t.pass("Converted Baz to Foo, ignoring extra variables");

    try {
        schema.toClass("run-time error", new Bar(), Baz);
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err);
    }
    try {
        schema.toClass("run-time error", new Foo(), Baz);
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err);
    }
    try {
        schema.toClass("run-time error", new Bar(), Foo);
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err);
    }
    try {
        schema.toClass("run-time error", new Foo(), Bar);
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err);
    }

    t.end();
});
