import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

class Sentinel {}
const sentinel = new Sentinel();

tape(__filename + "-optional", (t) => {
    const f = sd.optional(sd.instanceOf(Sentinel));

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.fail(t, f, null);
    myUtil.test(t, f, undefined, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });
    myUtil.test(t, f, sentinel, sentinel);

    t.end();
});

tape(__filename + "-nullable", (t) => {
    const f = sd.nullable(sd.instanceOf(Sentinel));

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.test(t, f, null, null);
    myUtil.fail(t, f, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });
    myUtil.test(t, f, sentinel, sentinel);

    t.end();
});

tape(__filename + "-maybe", (t) => {
    const f = sd.maybe(sd.instanceOf(Sentinel));

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.test(t, f, null, null);
    myUtil.test(t, f, undefined, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });
    myUtil.test(t, f, sentinel, sentinel);

    t.end();
});

tape(__filename + "-not-optional", (t) => {
    const f = sd.notOptional(sd.maybe(sd.instanceOf(Sentinel)));

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.test(t, f, null, null);
    myUtil.fail(t, f, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });
    myUtil.test(t, f, sentinel, sentinel);

    t.end();
});

tape(__filename + "-not-nullable", (t) => {
    const f = sd.notNullable(sd.maybe(sd.instanceOf(Sentinel)));

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
    myUtil.fail(t, f, NaN);
    myUtil.fail(t, f, Infinity);
    myUtil.fail(t, f, -Infinity);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, false);
    myUtil.fail(t, f, null);
    myUtil.test(t, f, undefined, undefined);
    myUtil.fail(t, f, true);
    myUtil.fail(t, f, new Date());
    myUtil.fail(t, f, () => {});
    myUtil.fail(t, f, []);
    myUtil.fail(t, f, [1,2]);
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });
    myUtil.test(t, f, sentinel, sentinel);

    t.end();
});

tape(__filename + "-not-maybe", (t) => {
    const f = sd.notMaybe(sd.maybe(sd.instanceOf(Sentinel)));

    myUtil.fail(t, f, 1);
    myUtil.fail(t, f, 0.5);
    myUtil.fail(t, f, 0);
    myUtil.fail(t, f, -0.5);
    myUtil.fail(t, f, -1);
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
    myUtil.fail(t, f, "Hello, world");
    myUtil.fail(t, f, {});
    myUtil.fail(t, f, { x : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });
    myUtil.test(t, f, sentinel, sentinel);

    t.end();
});
