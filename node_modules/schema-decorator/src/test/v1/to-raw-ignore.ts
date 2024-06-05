import * as schema from "../../main/index";
import * as tape from "tape";

tape("to-raw", (t) => {
    class Foo {
        var : number = 0;
    }
    try {
        schema.toRaw("run-time error", new Foo());
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err.message);
    }
    console.log(schema.toRaw("ok", new Foo(), [Foo]));
    t.pass("ignored Foo");
    t.end();
});
