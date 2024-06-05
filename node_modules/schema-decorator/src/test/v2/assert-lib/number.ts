import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-finite-number", (t) => {
    const f = sd.finiteNumber();

    myUtil.test(t, f, 1, 1);
    myUtil.test(t, f, 0.5, 0.5);
    myUtil.test(t, f, 0, 0);
    myUtil.test(t, f, -0.5, -0.5);
    myUtil.test(t, f, -1, -1);
    myUtil.test(t, f, 999999999999999, 999999999999999);
    myUtil.test(t, f, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
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
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-number", (t) => {
    const f = sd.number();

    myUtil.test(t, f, 1, 1);
    myUtil.test(t, f, 0.5, 0.5);
    myUtil.test(t, f, 0, 0);
    myUtil.test(t, f, -0.5, -0.5);
    myUtil.test(t, f, -1, -1);
    myUtil.test(t, f, 999999999999999, 999999999999999);
    myUtil.test(t, f, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
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
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-integer", (t) => {
    const f = sd.integer();

    myUtil.fail(t, f, 3.141);
    myUtil.test(t, f, 1, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.test(t, f, 0, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.test(t, f, -1, -1);
    myUtil.test(t, f, 999999999999999, 999999999999999);
    myUtil.test(t, f, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
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
    myUtil.fail(t, f, "3.141");
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-non-negative-number", (t) => {
    const f = sd.nonNegativeNumber();

    myUtil.test(t, f, 3.141, 3.141);
    myUtil.test(t, f, 1, 1);
    myUtil.test(t, f, 0.5, 0.5);
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
    myUtil.fail(t, f, "3.141");
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-natural-number", (t) => {
    const f = sd.naturalNumber();

    myUtil.fail(t, f, 3.141);
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
    myUtil.fail(t, f, "3.141");
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-gt(0)", (t) => {
    const f = sd.gt(0);

    myUtil.test(t, f, 3.141, 3.141);
    myUtil.test(t, f, 1, 1);
    myUtil.test(t, f, 0.5, 0.5);
    myUtil.fail(t, f, 0);
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
    myUtil.fail(t, f, "3.141");
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-lt(0)", (t) => {
    const f = sd.lt(0);

    myUtil.fail(t, f, 3.141);
    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.test(t, f, -0.5, -0.5);
    myUtil.test(t, f, -1, -1);
    myUtil.test(t, f, -3.141, -3.141);
    myUtil.fail(t, f, 999999999999999);
    myUtil.test(t, f, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
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
    myUtil.fail(t, f, "3.141");
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "-3.141");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-gtEq(0)", (t) => {
    const f = sd.gtEq(0);

    myUtil.test(t, f, 3.141, 3.141);
    myUtil.test(t, f, 1, 1);
    myUtil.test(t, f, 0.5, 0.5);
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
    myUtil.fail(t, f, "3.141");
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-ltEq(0)", (t) => {
    const f = sd.ltEq(0);

    myUtil.fail(t, f, 3.141);
    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.test(t, f, 0, 0);
    myUtil.test(t, f, -0.5, -0.5);
    myUtil.test(t, f, -1, -1);
    myUtil.test(t, f, -3.141, -3.141);
    myUtil.fail(t, f, 999999999999999);
    myUtil.test(t, f, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
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
    myUtil.fail(t, f, "3.141");
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "-3.141");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-neq(0)", (t) => {
    const f = sd.neq(0);

    myUtil.test(t, f, 3.141, 3.141);
    myUtil.test(t, f, 1, 1);
    myUtil.test(t, f, 0.5, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.test(t, f, -0.5, -0.5);
    myUtil.test(t, f, -1, -1);
    myUtil.test(t, f, -3.141, -3.141);
    myUtil.test(t, f, 999999999999999, 999999999999999);
    myUtil.test(t, f, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
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
    myUtil.fail(t, f, "3.141");
    myUtil.fail(t, f, "1");
    myUtil.fail(t, f, "0.5");
    myUtil.fail(t, f, "0");
    myUtil.fail(t, f, "-0.5");
    myUtil.fail(t, f, "-1");
    myUtil.fail(t, f, "-3.141");
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});
