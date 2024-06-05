import * as sd from "../../main/index";
import * as tape from "tape";

tape(__filename + "-basic", (t) => {
    const f = sd.derive(
        "x",
        "y",
        sd.stringToNaturalNumber()
    );
    t.deepEquals(
        f("obj", { x : "34" }),
        { y : 34 }
    );
    t.deepEquals(
        f("obj", { x : "34", y : "hello, world!" }),
        { y : 34 }
    );
    try {
        f("obj", { y : "34" });
        t.fail("Expected to fail");
    } catch (err) {
        t.pass(err.message);
    }
    try {
        f("obj", {});
        t.fail("Expected to fail");
    } catch (err) {
        t.pass(err.message);
    }

    t.end();
});

tape(__filename + "-intersect", (t) => {
    const f = sd.intersect(
        sd.schema(
            sd.field("x", sd.naturalNumberString())
        ),
        sd.derive(
            "x",
            "y",
            sd.stringToNaturalNumber()
        )
    );
    t.deepEquals(
        f("obj", { x : "34", test : 50 }),
        { x : "34", y : 34 }
    );
    t.deepEquals(
        f("obj", { x : "34", y : "99" }),
        { x : "34", y : 34 }
    );
    try {
        f("obj", { y : "34" });
        t.fail("Expected to fail");
    } catch (err) {
        t.pass(err.message);
    }
    try {
        f("obj", {});
        t.fail("Expected to fail");
    } catch (err) {
        t.pass(err.message);
    }

    t.end();
});