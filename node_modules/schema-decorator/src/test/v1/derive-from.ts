import * as sd from "../../main/index";
import * as tape from "tape";

tape(__filename + "-basic", (t) => {
    const f = sd.deriveFrom(
        "x",
        "y",
        sd.naturalNumberString(),
        parseInt,
        sd.naturalNumber()
    );
    t.deepEquals(
        f("obj", { x : "34" }),
        { x : "34", y : 34 }
    );
    t.deepEquals(
        f("obj", { x : "34", y : "hello, world!" }),
        { x : "34", y : 34 }
    );

    t.end();
});

tape(__filename + "-intersect", (t) => {
    const f = sd.intersect(
        sd.deriveFrom(
            "x",
            "y",
            sd.naturalNumberString(),
            parseInt,
            sd.naturalNumber()
        ),
        sd.schema(
            sd.field("test", sd.stringToNaturalNumber())
        )
    );
    t.deepEquals(
        f("obj", { x : "34", test : 50 }),
        { x : "34", y : 34, test : 50 }
    );
    t.deepEquals(
        f("obj", { x : "34", y : "99", test : 50 }),
        { x : "34", y : 34, test : 50 }
    );

    t.end();
});

tape(__filename + "-intersect2", (t) => {
    const f = sd.intersect(
        sd.deriveFrom(
            "x",
            "y",
            sd.naturalNumberString(),
            parseInt,
            sd.naturalNumber()
        ),
        sd.schema(
            sd.field("x", sd.naturalNumberString())
        )
    );
    t.deepEquals(
        f("obj", { x : "34", test : 50 }),
        { x : "34", y : 34 }
    );
    t.deepEquals(
        f("obj", { x : "34", y : "99", test : 50 }),
        { x : "34", y : 34 }
    );

    t.end();
});