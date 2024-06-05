import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-literal", (t) => {
    myUtil.test(t, sd.literal("a"), "a", "a");
    myUtil.fail(t, sd.literal("a"), "b");

    myUtil.test(t, sd.literal("a", "b"), "a", "a");
    myUtil.test(t, sd.literal("a", "b"), "b", "b");
    myUtil.fail(t, sd.literal("a", "b"), "c");

    myUtil.test(t, sd.literal(true, 1, "true"), true, true);
    myUtil.test(t, sd.literal(true, 1, "true"), 1, 1);
    myUtil.test(t, sd.literal(true, 1, "true"), "true", "true");
    myUtil.fail(t, sd.literal(true, 1, "true"), false);

    t.end();
});

tape(__filename + "-exclude-literal", (t) => {
    const bOnly = sd.excludeLiteral(
        sd.literal("a", "b"),
        "a"
    );
    myUtil.fail(t, bOnly, "a");
    myUtil.test(t, bOnly, "b", "b");
    myUtil.fail(t, bOnly, "c");

    const aOnly = sd.excludeLiteral(
        sd.literal("a", "b"),
        "b"
    );

    myUtil.test(t, aOnly, "a", "a");
    myUtil.fail(t, aOnly, "b");
    myUtil.fail(t, aOnly, "c");

    t.end();
});

tape(__filename + "-boolean", (t) => {
    myUtil.test(t, sd.boolean(), true, true);
    myUtil.test(t, sd.boolean(), false, false);
    myUtil.fail(t, sd.boolean(), 1);
    myUtil.fail(t, sd.boolean(), 0);

    //sd.literal(true) is better but I'm just doing tests
    const trueOnly = sd.excludeLiteral(sd.boolean(), false);
    myUtil.test(t, trueOnly, true, true);
    myUtil.fail(t, trueOnly, false);
    myUtil.fail(t, trueOnly, 1);
    myUtil.fail(t, trueOnly, 0);

    //sd.literal(false) is better but I'm just doing tests
    const falseOnly = sd.excludeLiteral(sd.boolean(), true);
    myUtil.fail(t, falseOnly, true);
    myUtil.test(t, falseOnly, false, false);
    myUtil.fail(t, falseOnly, 1);
    myUtil.fail(t, falseOnly, 0);

    t.end();
});

tape(__filename + "-unsafe-number", (t) => {
    myUtil.test(t, sd.unsafeNumber(), 1, 1);
    myUtil.test(t, sd.unsafeNumber(), -1, -1);
    myUtil.test(t, sd.unsafeNumber(), 0, 0);
    myUtil.test(t, sd.unsafeNumber(), 3.141, 3.141);
    //unsafeNumber is named so because it allows these values
    myUtil.test(t, sd.unsafeNumber(), NaN, NaN);
    myUtil.test(t, sd.unsafeNumber(), Infinity, Infinity);
    myUtil.test(t, sd.unsafeNumber(), -Infinity, -Infinity);

    myUtil.fail(t, sd.unsafeNumber(), true);
    myUtil.fail(t, sd.unsafeNumber(), false);
    myUtil.fail(t, sd.unsafeNumber(), "1");
    myUtil.fail(t, sd.unsafeNumber(), "0");
    myUtil.fail(t, sd.unsafeNumber(), "-1");
    t.end();
});

tape(__filename + "-string", (t) => {
    myUtil.test(t, sd.string(), "hello", "hello");
    myUtil.test(t, sd.string(), "world", "world");
    myUtil.test(t, sd.string(), "", "");

    myUtil.fail(t, sd.string(), true);
    myUtil.fail(t, sd.string(), false);
    myUtil.fail(t, sd.string(), 1);
    myUtil.fail(t, sd.string(), 0);
    myUtil.fail(t, sd.string(), -1);
    t.end();
});

tape(__filename + "-nil", (t) => {
    myUtil.test(t, sd.nil(), null, null);

    myUtil.fail(t, sd.nil(), undefined);
    myUtil.fail(t, sd.nil(), 0);
    myUtil.fail(t, sd.nil(), "");
    myUtil.fail(t, sd.nil(), "null");
    myUtil.fail(t, sd.nil(), []);
    t.end();
});

tape(__filename + "-undef", (t) => {
    myUtil.test(t, sd.undef(), undefined, undefined);

    myUtil.fail(t, sd.undef(), null);
    myUtil.fail(t, sd.undef(), 0);
    myUtil.fail(t, sd.undef(), "");
    myUtil.fail(t, sd.undef(), "undefined");
    myUtil.fail(t, sd.undef(), []);
    t.end();
});

tape(__filename + "-any", (t) => {
    myUtil.test(t, sd.any(), null, null);
    myUtil.test(t, sd.any(), undefined, undefined);
    myUtil.test(t, sd.any(), 0, 0);
    myUtil.test(t, sd.any(), true, true);
    myUtil.test(t, sd.any(), false, false);
    myUtil.test(t, sd.any(), "hello", "hello");
    myUtil.test(t, sd.any(), 3.141, 3.141);
    myUtil.test(t, sd.any(), NaN, NaN);
    myUtil.test(t, sd.any(), Infinity, Infinity);
    t.end();
});