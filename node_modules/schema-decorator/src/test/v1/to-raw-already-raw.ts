import * as schema from "../../main/index";
import * as tape from "tape";

tape("to-raw-already-raw", (t) => {
    class Foo {
        var : number = 0;
    }
    console.log(schema.anyToRaw("ok", {
        someValue : 3,
        someSubObject : {
            someSubValue : "subValue",
            someSubSubObject : {
                someSubSubValue : new Date(),
            },
        },
    }));
    t.pass();

    try {
        schema.anyToRaw("run-time error", {
            someValue : 3,
            someSubObject : {
                someSubValue : new Foo(),
            },
        });
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err.message);
    }
    try {
        schema.anyToRaw("run-time error", {
            someValue : 3,
            someSubObject : {
                someSubValue : "subValue",
                someSubSubObject : {
                    someSubSubValue : new Foo(),
                },
            },
        });
        t.fail("Expected a run-time error");
    } catch (err) {
        t.pass(err.message);
    }
    t.end();
});
