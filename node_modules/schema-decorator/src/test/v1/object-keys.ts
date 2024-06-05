import * as schema from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";
import * as myUtil from "./util";

tape("basic-object-keys", (t) => {
    class Foo {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
    }
    const foo = new Foo();
    myUtil.testKeys(t, foo, ["var"]);

    class Bar {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
        @schema.assert(validation.Number.assertNaturalNumber)
        var2 : number = 0;
    }
    const bar = new Bar();
    myUtil.testKeys(t, bar, ["var", "var2"]);

    t.end();
});
tape("object-keys-optional", (t) => {
    class Foo {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
        @schema.assert(schema.maybe(validation.Number.assertNaturalNumber))
        optional? : number;
    }
    const foo = new Foo();
    myUtil.testKeys(t, foo, ["var"]);

    foo.optional = 4;
    myUtil.testKeys(t, foo, ["var", "optional"]);

    t.end();
});
tape("object-keys-leading-underscores", (t) => {
    class Foo {
        @schema.assert(validation.Number.assertNaturalNumber)
        _var : number = 0;
    }
    const foo = new Foo();
    myUtil.testKeys(t, foo, ["_var"]);

    class Bar {
        @schema.assert(validation.Number.assertNaturalNumber)
        _var : number = 0;
        @schema.assert(validation.Number.assertNaturalNumber)
        _var2 : number = 0;
    }
    const bar = new Bar();
    myUtil.testKeys(t, bar, ["_var", "_var2"]);

    t.end();
});
