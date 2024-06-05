import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-rename", (t) => {
    const f = sd.rename("x", "y", sd.naturalNumber());

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
    myUtil.test(t, f, { x : 4 }, { y : 4 });
    myUtil.test(t, f, { y : 4 }, { y : 4 });
    myUtil.test(t, f, { x : 4, y : 5 }, { y : 5 });
    myUtil.test(t, f, { x : 4, y : 5, z : 6 }, { y : 5 });
    myUtil.fail(t, f, { z : 4 });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

//TODO Deprecate
tape(__filename + "-derive-from", (t) => {
    const f = sd.deriveFrom(
        "x",
        "y",
        sd.naturalNumberString(),
        parseInt,
        sd.naturalNumber()
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
    myUtil.test(t, f, { x : "4" }, { x : "4", y : 4 });
    myUtil.fail(t, f, { y : "4" });
    myUtil.test(t, f, { x : "4", y : "5" }, { x : "4", y : 4 });
    myUtil.test(t, f, { x : "4", y : "5", z : "6" }, { x : "4", y : 4 });
    myUtil.fail(t, f, { z : "4" });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

tape(__filename + "-derive", (t) => {
    const f = sd.derive(
        "x",
        "y",
        sd.stringToNaturalNumber()
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
    myUtil.test(t, f, { x : 4 }, { y : 4 });
    myUtil.fail(t, f, { y : 4 });
    myUtil.test(t, f, { x : 4, y : 5 }, { y : 4 });
    myUtil.test(t, f, { x : 4, y : 5, z : 6 }, { y : 4 });
    myUtil.fail(t, f, { z : 4 });
    myUtil.test(t, f, { x : "4" }, { y : 4 });
    myUtil.fail(t, f, { y : "4" });
    myUtil.test(t, f, { x : "4", y : "5" }, { y : 4 });
    myUtil.test(t, f, { x : "4", y : "5", z : "6" }, { y : 4 });
    myUtil.fail(t, f, { z : "4" });
    myUtil.fail(t, f, { x : [4, "hello"] });

    t.end();
});

class A {}
class B { x = 4 }
class C { x = 4 }
class AChild extends A {}
class BChild extends B { y = 4 }
class CChild extends C { y = "4" }
const a = new A();
const b = new B();
const c = new C();
const aChild = new AChild();
const bChild = new BChild();
const cChild = new CChild();

tape(__filename + "-instance-of(A)", (t) => {
    const f = sd.instanceOf(A);

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
    myUtil.fail(t, f, { x : "4" });
    myUtil.fail(t, f, { y : "4" });
    myUtil.fail(t, f, { x : "4", y : "5" });
    myUtil.fail(t, f, { x : "4", y : "5", z : "6" });
    myUtil.fail(t, f, { z : "4" });
    myUtil.fail(t, f, { x : [4, "hello"] });
    myUtil.test(t, f, a, a);
    myUtil.fail(t, f, b);
    myUtil.fail(t, f, c);
    myUtil.test(t, f, aChild, aChild);
    myUtil.fail(t, f, bChild);
    myUtil.fail(t, f, cChild);

    t.end();
});

tape(__filename + "-instance-of(AChild)", (t) => {
    const f = sd.instanceOf(AChild);

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
    myUtil.fail(t, f, { x : "4" });
    myUtil.fail(t, f, { y : "4" });
    myUtil.fail(t, f, { x : "4", y : "5" });
    myUtil.fail(t, f, { x : "4", y : "5", z : "6" });
    myUtil.fail(t, f, { z : "4" });
    myUtil.fail(t, f, { x : [4, "hello"] });
    myUtil.fail(t, f, a);
    myUtil.fail(t, f, b);
    myUtil.fail(t, f, c);
    myUtil.test(t, f, aChild, aChild);
    myUtil.fail(t, f, bChild);
    myUtil.fail(t, f, cChild);

    t.end();
});

tape(__filename + "-dictionary", (t) => {
    const f = sd.dictionary(sd.naturalNumber());

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
    myUtil.test(t, f, {}, {});
    myUtil.test(t, f, { x : 4 }, { x : 4 });
    myUtil.test(t, f, { y : 4 }, { y : 4 });
    myUtil.test(t, f, { x : 4, y : 5 }, { x : 4, y : 5 });
    myUtil.test(t, f, { x : 4, y : 5, z : 6 }, { x : 4, y : 5, z : 6 });
    myUtil.test(t, f, { z : 4 }, { z : 4 });
    myUtil.fail(t, f, { x : "4" });
    myUtil.fail(t, f, { y : "4" });
    myUtil.fail(t, f, { x : "4", y : "5" });
    myUtil.fail(t, f, { x : "4", y : "5", z : "6" });
    myUtil.fail(t, f, { z : "4" });
    myUtil.fail(t, f, { x : [4, "hello"] });
    myUtil.test(t, f, a, a);
    myUtil.test(t, f, b, b);
    myUtil.test(t, f, c, c);
    myUtil.test(t, f, aChild, aChild);
    myUtil.test(t, f, bChild, bChild);
    myUtil.fail(t, f, cChild);
    myUtil.fail(t, f, { x : 4, y : "4" });
    myUtil.fail(t, f, { y : 4, z : "4" });
    myUtil.fail(t, f, { x : 4, y : 5, z : "4" });
    myUtil.fail(t, f, { x : 4, y : 5, z : 6, w : "4" });
    myUtil.fail(t, f, { z : 4, w : "4" });

    t.end();
});

tape(__filename + "-empty-object", (t) => {
    const f = sd.emptyObject();

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
    myUtil.test(t, f, {}, {});
    myUtil.test(t, f, { x : 4 }, {});
    myUtil.test(t, f, { y : 4 }, {});
    myUtil.test(t, f, { x : 4, y : 5 }, {});
    myUtil.test(t, f, { x : 4, y : 5, z : 6 }, {});
    myUtil.test(t, f, { z : 4 }, {});
    myUtil.test(t, f, { x : "4" }, {});
    myUtil.test(t, f, { y : "4" }, {});
    myUtil.test(t, f, { x : "4", y : "5" }, {});
    myUtil.test(t, f, { x : "4", y : "5", z : "6" }, {});
    myUtil.test(t, f, { z : "4" }, {});
    myUtil.test(t, f, { x : [4, "hello"] }, {});
    myUtil.test(t, f, a, {});
    myUtil.test(t, f, b, {});
    myUtil.test(t, f, c, {});
    myUtil.test(t, f, aChild, {});
    myUtil.test(t, f, bChild, {});
    myUtil.test(t, f, cChild, {});
    myUtil.test(t, f, { x : 4, y : "4" }, {});
    myUtil.test(t, f, { y : 4, z : "4" }, {});
    myUtil.test(t, f, { x : 4, y : 5, z : "4" }, {});
    myUtil.test(t, f, { x : 4, y : 5, z : 6, w : "4" }, {});
    myUtil.test(t, f, { z : 4, w : "4" }, {});

    t.end();
});
