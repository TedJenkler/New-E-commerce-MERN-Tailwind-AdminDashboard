import * as sd from "../../main/index";
import * as tape from "tape";

tape(__filename + "-basic", (t) => {
    const f = sd.rename(
        "x",
        "y",
        sd.stringToNaturalNumber()
    );
    t.deepEquals(
        f("obj", { x : "34" }),
        { y : 34 }
    );
    t.deepEquals(
        f("obj", { y : "34" }),
        { y : 34 }
    );
    t.deepEquals(
        f("obj", { x : "34", y : "99" }),
        { y : 99 }
    );

    t.end();
});

tape(__filename + "-intersect", (t) => {
    const f = sd.intersect(
        sd.rename(
            "x",
            "y",
            sd.stringToNaturalNumber()
        ),
        sd.schema(
            sd.field("test", sd.stringToNaturalNumber())
        )
    );
    t.deepEquals(
        f("obj", { x : "34", test : 50 }),
        { y : 34, test : 50 }
    );
    t.deepEquals(
        f("obj", { y : "34", test : 50 }),
        { y : 34, test : 50 }
    );

    t.end();
});