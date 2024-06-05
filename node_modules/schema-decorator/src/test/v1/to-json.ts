import * as schema from "../../main/index";
import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";
import * as myUtil from "./util";

tape("basic-to-json", (t) => {
    class Foo {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
    }
    const foo = new Foo();
    foo.var = 0;
    myUtil.testToJson(t, foo, { var : 0 });
    foo.var = 99;
    myUtil.testToJson(t, foo, { var : 99 });
    t.end();
});
tape("to-json-nested", (t) => {
    class Nested {
        @schema.assert(validation.String.assertString)
        nestedValue : string = "";
    }
    class Foo {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
        @schema.assert(schema.or(schema.undef(), schema.nested(Nested)))
        nested : undefined|Nested = undefined;
    }
    const foo = new Foo();
    foo.var = 0;
    myUtil.testToJson(t, foo, { var : 0, nested : undefined });
    foo.var = 99;
    myUtil.testToJson(t, foo, { var : 99, nested : undefined });
    foo.var = 99;
    foo.nested = new Nested();
    myUtil.testToJson(t, foo, { var : 99, nested : { nestedValue : "" } });
    foo.nested.nestedValue = "test";
    myUtil.testToJson(t, foo, { var : 99, nested : { nestedValue : "test" } });
    t.end();
});
tape("to-json-optionals", (t) => {
    class Nested {
        @schema.assert(validation.String.assertString)
        nestedValue : string = "";
    }
    class Foo {
        @schema.assert(validation.Number.assertNaturalNumber)
        var : number = 0;
        @schema.assert(schema.or(schema.undef(), schema.nested(Nested)))
        nested? : Nested;
    }
    const foo = new Foo();
    foo.var = 0;
    myUtil.testToJson(t, foo, { var : 0 });
    foo.var = 99;
    myUtil.testToJson(t, foo, { var : 99 });
    foo.var = 99;
    foo.nested = new Nested();
    myUtil.testToJson(t, foo, { var : 99, nested : { nestedValue : "" } });
    foo.nested.nestedValue = "test";
    myUtil.testToJson(t, foo, { var : 99, nested : { nestedValue : "test" } });
    t.end();
});
tape("to-json-leading-underscore", (t) => {
    class Foo {
        @schema.assert(validation.Number.assertNaturalNumber)
        _var : number = 0;
    }
    const foo = new Foo();
    foo._var = 0;
    myUtil.testToJson(t, foo, { _var : 0 });
    foo._var = 99;
    myUtil.testToJson(t, foo, { _var : 99 });
    t.end();
});
