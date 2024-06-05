import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-finite-number-string", (t) => {
    const f = sd.finiteNumberString();
    myUtil.test(t, f, "3", "3");
    myUtil.test(t, f, "3.1", "3.1");
    myUtil.test(t, f, "0", "0");
    myUtil.test(t, f, "-3.1", "-3.1");
    myUtil.test(t, f, "-3", "-3");
    myUtil.fail(t, f, "hello");
    myUtil.fail(t, f, "");

    t.end();
});

tape(__filename + "-integer-string", (t) => {
    const f = sd.integerString();
    myUtil.test(t, f, "3", "3");
    myUtil.fail(t, f, "3.1");
    myUtil.test(t, f, "0", "0");
    myUtil.fail(t, f, "-3.1");
    myUtil.test(t, f, "-3", "-3");
    myUtil.fail(t, f, "hello");
    myUtil.fail(t, f, "");

    t.end();
});

tape(__filename + "-natural-number-string", (t) => {
    const f = sd.naturalNumberString();
    myUtil.test(t, f, "3", "3");
    myUtil.fail(t, f, "3.1");
    myUtil.test(t, f, "0", "0");
    myUtil.fail(t, f, "-3.1");
    myUtil.fail(t, f, "-3");
    myUtil.fail(t, f, "hello");
    myUtil.fail(t, f, "");

    t.end();
});

tape(__filename + "-string-to-number", (t) => {
    const f = sd.stringToNumber();
    myUtil.test(t, f, "3", 3);
    myUtil.test(t, f, "3.1", 3.1);
    myUtil.test(t, f, "0", 0);
    myUtil.test(t, f, "-3.1", -3.1);
    myUtil.test(t, f, "-3", -3);
    myUtil.test(t, f, 3, 3);
    myUtil.test(t, f, 3.1, 3.1);
    myUtil.test(t, f, 0, 0);
    myUtil.test(t, f, -3.1, -3.1);
    myUtil.test(t, f, -3, -3);
    myUtil.fail(t, f, "hello");
    myUtil.fail(t, f, "");

    t.end();
});

tape(__filename + "-string-to-integer", (t) => {
    const f = sd.stringToInteger();
    myUtil.test(t, f, "3", 3);
    myUtil.fail(t, f, "3.1");
    myUtil.test(t, f, "0", 0);
    myUtil.fail(t, f, "-3.1");
    myUtil.test(t, f, "-3", -3);
    myUtil.test(t, f, 3, 3);
    myUtil.fail(t, f, 3.1);
    myUtil.test(t, f, 0, 0);
    myUtil.fail(t, f, -3.1);
    myUtil.test(t, f, -3, -3);
    myUtil.fail(t, f, "hello");
    myUtil.fail(t, f, "");

    t.end();
});

tape(__filename + "-string-to-natural-number", (t) => {
    const f = sd.stringToNaturalNumber();
    myUtil.test(t, f, "3", 3);
    myUtil.fail(t, f, "3.1");
    myUtil.test(t, f, "0", 0);
    myUtil.fail(t, f, "-3.1");
    myUtil.fail(t, f, "-3");
    myUtil.test(t, f, 3, 3);
    myUtil.fail(t, f, 3.1);
    myUtil.test(t, f, 0, 0);
    myUtil.fail(t, f, -3.1);
    myUtil.fail(t, f, -3);
    myUtil.fail(t, f, "hello");
    myUtil.fail(t, f, "");

    t.end();
});
