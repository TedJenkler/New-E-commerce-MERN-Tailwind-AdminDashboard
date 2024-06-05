import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-or", (t) => {
    const f = sd.or(
        sd.naturalNumber(),
        sd.string()
    );

    myUtil.test(t, f, 1, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.test(t, f, 0, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.test(t, f, 999999999999999, 999999999999999);
    myUtil.fail(t, f, Number.MIN_SAFE_INTEGER);
    myUtil.test(t, f, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.fail(t, f, null);
    myUtil.fail(t, f, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.test(t, f, "1", "1");
    myUtil.test(t, f, "0.5", "0.5");
    myUtil.test(t, f, "0", "0");
    myUtil.test(t, f, "-0.5", "-0.5");
    myUtil.test(t, f, "-1", "-1");
    myUtil.test(t, f, "Hello, world", "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { y : 4 });
    myUtil.fail(t, f, { x : 4, y : 5 });
    myUtil.fail(t, f, { x : 4, y : 5, z : 6 });
    myUtil.fail(t, f, { z : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-chain", (t) => {
    const f = sd.chain(
        sd.finiteNumber(),
        (_name : string, n : number) => {
            return Math.floor(n);
        },
        (_name : string, n : number) => {
            return n.toString();
        }
    );

    myUtil.test(t, f, 1, "1");
    myUtil.test(t, f, 0.5, "0");
    myUtil.test(t, f, 0, "0");
    myUtil.test(t, f, -0.5, "-1");
    myUtil.test(t, f, -1, "-1");
    myUtil.test(t, f, 999999999999999, "999999999999999");
    myUtil.test(t, f, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER.toString());
    myUtil.test(t, f, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER.toString());
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.fail(t, f, null);
    myUtil.fail(t, f, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { y : 4 });
    myUtil.fail(t, f, { x : 4, y : 5 });
    myUtil.fail(t, f, { x : 4, y : 5, z : 6 });
    myUtil.fail(t, f, { z : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-intersect", (t) => {
    const f = sd.intersect(
        sd.schema(
            sd.field("x", sd.naturalNumber())
        ),
        sd.schema(
            sd.field("y", sd.string())
        ),
        sd.schema(
            sd.field("obj", sd.schema(
                sd.field("z", sd.boolean())
            ))
        ),
        sd.schema(
            sd.field("obj", sd.schema(
                sd.field("w", sd.date())
            ))
        )
    );

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.fail(t, f, 999999999999999);
    myUtil.fail(t, f, Number.MIN_SAFE_INTEGER);
    myUtil.fail(t, f, Number.MAX_SAFE_INTEGER);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.fail(t, f, null);
    myUtil.fail(t, f, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { y : 4 });
    myUtil.fail(t, f, { x : 4, y : 5 });
    myUtil.fail(t, f, { x : 4, y : 5, z : 6 });
    myUtil.fail(t, f, { z : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    const now = new Date();
    myUtil.test(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : true,
            w : now
        }
    }, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : true,
            w : now
        }
    });

    myUtil.test(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : true,
            w : now,
            extraField : "I will be removed"
        }
    }, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : true,
            w : now
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            w : now
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : true
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {}
    });

    t.end();
});

tape(__filename + "-intersect-impossible-type", (t) => {
    //An impossible type
    const f = sd.intersect(
        sd.schema(
            sd.field("x", sd.naturalNumber())
        ),
        sd.schema(
            sd.field("y", sd.string())
        ),
        sd.schema(
            sd.field("obj", sd.schema(
                sd.field("z", sd.boolean())
            ))
        ),
        sd.schema(
            sd.field("obj", sd.schema(
                sd.field("z", sd.date())
            ))
        )
    );

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.fail(t, f, 999999999999999);
    myUtil.fail(t, f, Number.MIN_SAFE_INTEGER);
    myUtil.fail(t, f, Number.MAX_SAFE_INTEGER);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.fail(t, f, null);
    myUtil.fail(t, f, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { y : 4 });
    myUtil.fail(t, f, { x : 4, y : 5 });
    myUtil.fail(t, f, { x : 4, y : 5, z : 6 });
    myUtil.fail(t, f, { z : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    const now = new Date();
    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : true,
            w : now
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : now
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : true
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {}
    });

    t.end();
});

tape(__filename + "-intersect-different-value-derived", (t) => {
    //Derives different values for 'z'
    const f = sd.intersect(
        sd.schema(
            sd.field("x", sd.naturalNumber())
        ),
        sd.schema(
            sd.field("y", sd.string())
        ),
        sd.schema(
            sd.field("obj", sd.schema(
                sd.field("z", sd.stringToNaturalNumber())
            ))
        ),
        sd.schema(
            sd.field("obj", sd.schema(
                sd.field("z", sd.date())
            ))
        )
    );

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.fail(t, f, 999999999999999);
    myUtil.fail(t, f, Number.MIN_SAFE_INTEGER);
    myUtil.fail(t, f, Number.MAX_SAFE_INTEGER);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.fail(t, f, null);
    myUtil.fail(t, f, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { y : 4 });
    myUtil.fail(t, f, { x : 4, y : 5 });
    myUtil.fail(t, f, { x : 4, y : 5, z : 6 });
    myUtil.fail(t, f, { z : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : "0",
            w : "0"
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : "0"
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : 0
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {
            z : new Date()
        }
    });

    myUtil.fail(t, f, {
        x : 34,
        y : "Hello, world",
        obj : {}
    });

    t.end();
});

tape(__filename + "-and", (t) => {
    //Only a 2 or 3 digit natural number string will satisfy this
    const f = sd.and(
        sd.naturalNumberString(),
        sd.varChar(2, 3)
    );

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.fail(t, f, 999999999999999);
    myUtil.fail(t, f, Number.MIN_SAFE_INTEGER);
    myUtil.fail(t, f, Number.MAX_SAFE_INTEGER);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.fail(t, f, null);
    myUtil.fail(t, f, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { y : 4 });
    myUtil.fail(t, f, { x : 4, y : 5 });
    myUtil.fail(t, f, { x : 4, y : 5, z : 6 });
    myUtil.fail(t, f, { z : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    myUtil.test(t, f, "10", "10");
    myUtil.test(t, f, "50", "50");
    myUtil.test(t, f, "99", "99");
    myUtil.test(t, f, "100", "100");
    myUtil.test(t, f, "500", "500");
    myUtil.test(t, f, "999", "999");
    myUtil.fail(t, f, "1000");
    myUtil.fail(t, f, "2000");
    myUtil.fail(t, f, "10000");

    myUtil.fail(t, f, "-10");
    myUtil.fail(t, f, "-50");
    myUtil.fail(t, f, "-99");
    myUtil.fail(t, f, "-100");
    myUtil.fail(t, f, "-500");
    myUtil.fail(t, f, "-999");
    myUtil.fail(t, f, "-1000");
    myUtil.fail(t, f, "-2000");
    myUtil.fail(t, f, "-10000");

    myUtil.fail(t, f, "a");
    myUtil.fail(t, f, "ab");
    myUtil.fail(t, f, "abc");
    myUtil.fail(t, f, "abcd");

    t.end();
});