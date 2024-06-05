import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename, (t) => {
    const aArr = sd.array(sd.literal("a"));

    myUtil.test(t, aArr, [], []);
    myUtil.test(t, aArr, ["a"], ["a"]);
    myUtil.test(t, aArr, ["a", "a"], ["a", "a"]);
    myUtil.test(t, aArr, ["a", "a", "a"], ["a", "a", "a"]);

    myUtil.fail(t, aArr, 0);
    myUtil.fail(t, aArr, { length : 0 });
    myUtil.fail(t, aArr, "");
    myUtil.fail(t, aArr, "a");
    myUtil.fail(t, aArr, ["b"]);
    myUtil.fail(t, aArr, ["a", "b"]);

    const abArr = sd.array(sd.literal("a", "b"));

    myUtil.test(t, abArr, [], []);
    myUtil.test(t, abArr, ["a"], ["a"]);
    myUtil.test(t, abArr, ["b"], ["b"]);
    myUtil.test(t, abArr, ["a", "a"], ["a", "a"]);
    myUtil.test(t, abArr, ["a", "b"], ["a", "b"]);
    myUtil.test(t, abArr, ["b", "a"], ["b", "a"]);
    myUtil.test(t, abArr, ["b", "b"], ["b", "b"]);
    myUtil.test(t, abArr, ["a", "a", "a"], ["a", "a", "a"]);
    myUtil.test(t, abArr, ["a", "a", "b"], ["a", "a", "b"]);
    myUtil.test(t, abArr, ["a", "b", "a"], ["a", "b", "a"]);
    myUtil.test(t, abArr, ["a", "b", "b"], ["a", "b", "b"]);
    myUtil.test(t, abArr, ["b", "a", "a"], ["b", "a", "a"]);
    myUtil.test(t, abArr, ["b", "a", "b"], ["b", "a", "b"]);
    myUtil.test(t, abArr, ["b", "b", "a"], ["b", "b", "a"]);
    myUtil.test(t, abArr, ["b", "b", "b"], ["b", "b", "b"]);

    myUtil.fail(t, abArr, 0);
    myUtil.fail(t, abArr, { length : 0 });
    myUtil.fail(t, abArr, "");
    myUtil.fail(t, abArr, "a");
    myUtil.fail(t, abArr, "b");
    myUtil.fail(t, abArr, "ab");
    myUtil.fail(t, abArr, "ba");
    myUtil.fail(t, abArr, ["c"]);
    myUtil.fail(t, abArr, ["a", "c"]);
    myUtil.fail(t, abArr, ["b", "c"]);


    t.end();
});