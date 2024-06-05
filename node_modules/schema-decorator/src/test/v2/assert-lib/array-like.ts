import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-max-length", (t) => {
    myUtil.test(t, sd.maxLength(2), [1, 2], [1, 2]);
    myUtil.test(t, sd.maxLength(2), [1], [1]);
    myUtil.test(t, sd.maxLength(2), [], []);

    myUtil.test(t, sd.maxLength(2), "ab", "ab");
    myUtil.test(t, sd.maxLength(2), "a", "a");
    myUtil.test(t, sd.maxLength(2), "", "");

    myUtil.fail(t, sd.maxLength(2), [1, 2, 3]);
    myUtil.fail(t, sd.maxLength(2), [1, 2, 3, 4]);
    myUtil.fail(t, sd.maxLength(2), "abc");
    myUtil.fail(t, sd.maxLength(2), "abcd");

    myUtil.test(t, sd.maxLength(2), { length : 0 }, { length : 0 });
    myUtil.test(t, sd.maxLength(2), { length : 1 }, { length : 1 });
    myUtil.test(t, sd.maxLength(2), { length : 2 }, { length : 2 });

    myUtil.fail(t, sd.maxLength(2), { length : 3 });
    myUtil.fail(t, sd.maxLength(2), { length : 4 });
    myUtil.fail(t, sd.maxLength(2), { length : -1 });
    myUtil.fail(t, sd.maxLength(2), { length : -2 });
    myUtil.fail(t, sd.maxLength(2), { length : NaN });
    myUtil.fail(t, sd.maxLength(2), { length : Infinity });
    myUtil.fail(t, sd.maxLength(2), { length : -Infinity });
    myUtil.fail(t, sd.maxLength(2), { length : false });
    myUtil.fail(t, sd.maxLength(2), { length : true });
    myUtil.fail(t, sd.maxLength(2), { length : "0" });
    myUtil.fail(t, sd.maxLength(2), { length : "1" });

    t.end();
});

tape(__filename + "-min-length", (t) => {
    myUtil.fail(t, sd.minLength(2), [1]);
    myUtil.fail(t, sd.minLength(2), []);
    myUtil.fail(t, sd.minLength(2), "a");
    myUtil.fail(t, sd.minLength(2), "");

    myUtil.test(t, sd.minLength(2), [1, 2], [1, 2]);
    myUtil.test(t, sd.minLength(2), [1, 2, 3], [1, 2, 3]);
    myUtil.test(t, sd.minLength(2), [1, 2, 3, 4], [1, 2, 3, 4]);
    myUtil.test(t, sd.minLength(2), "ab", "ab");
    myUtil.test(t, sd.minLength(2), "abc", "abc");
    myUtil.test(t, sd.minLength(2), "abcd", "abcd");

    myUtil.fail(t, sd.minLength(2), { length : 0 });
    myUtil.fail(t, sd.minLength(2), { length : 1 });

    myUtil.test(t, sd.minLength(2), { length : 2 }, { length : 2 });
    myUtil.test(t, sd.minLength(2), { length : 3 }, { length : 3 });
    myUtil.test(t, sd.minLength(2), { length : 4 }, { length : 4 });

    myUtil.fail(t, sd.minLength(2), { length : -1 });
    myUtil.fail(t, sd.minLength(2), { length : -2 });
    myUtil.fail(t, sd.minLength(2), { length : NaN });
    myUtil.fail(t, sd.minLength(2), { length : Infinity });
    myUtil.fail(t, sd.minLength(2), { length : -Infinity });
    myUtil.fail(t, sd.minLength(2), { length : false });
    myUtil.fail(t, sd.minLength(2), { length : true });
    myUtil.fail(t, sd.minLength(2), { length : "0" });
    myUtil.fail(t, sd.minLength(2), { length : "1" });
    myUtil.fail(t, sd.minLength(2), { length : "2" });
    myUtil.fail(t, sd.minLength(2), { length : "3" });
    myUtil.fail(t, sd.minLength(2), { length : "4" });

    t.end();
});

tape(__filename + "-length(max)", (t) => {
    myUtil.test(t, sd.length(2), [1, 2], [1, 2]);
    myUtil.test(t, sd.length(2), [1], [1]);
    myUtil.test(t, sd.length(2), [], []);

    myUtil.test(t, sd.length(2), "ab", "ab");
    myUtil.test(t, sd.length(2), "a", "a");
    myUtil.test(t, sd.length(2), "", "");

    myUtil.fail(t, sd.length(2), [1, 2, 3]);
    myUtil.fail(t, sd.length(2), [1, 2, 3, 4]);
    myUtil.fail(t, sd.length(2), "abc");
    myUtil.fail(t, sd.length(2), "abcd");

    myUtil.test(t, sd.length(2), { length : 0 }, { length : 0 });
    myUtil.test(t, sd.length(2), { length : 1 }, { length : 1 });
    myUtil.test(t, sd.length(2), { length : 2 }, { length : 2 });

    myUtil.fail(t, sd.length(2), { length : 3 });
    myUtil.fail(t, sd.length(2), { length : 4 });
    myUtil.fail(t, sd.length(2), { length : -1 });
    myUtil.fail(t, sd.length(2), { length : -2 });
    myUtil.fail(t, sd.length(2), { length : NaN });
    myUtil.fail(t, sd.length(2), { length : Infinity });
    myUtil.fail(t, sd.length(2), { length : -Infinity });
    myUtil.fail(t, sd.length(2), { length : false });
    myUtil.fail(t, sd.length(2), { length : true });
    myUtil.fail(t, sd.length(2), { length : "0" });
    myUtil.fail(t, sd.length(2), { length : "1" });

    t.end();
});

tape(__filename + "-length(min, max)", (t) => {
    myUtil.test(t, sd.length(1, 2), [1, 2], [1, 2]);
    myUtil.test(t, sd.length(1, 2), [1], [1]);
    myUtil.fail(t, sd.length(1, 2), []);

    myUtil.test(t, sd.length(1, 2), "ab", "ab");
    myUtil.test(t, sd.length(1, 2), "a", "a");
    myUtil.fail(t, sd.length(1, 2), "");

    myUtil.fail(t, sd.length(1, 2), [1, 2, 3]);
    myUtil.fail(t, sd.length(1, 2), [1, 2, 3, 4]);
    myUtil.fail(t, sd.length(1, 2), "abc");
    myUtil.fail(t, sd.length(1, 2), "abcd");

    myUtil.fail(t, sd.length(1, 2), { length : 0 });
    myUtil.test(t, sd.length(1, 2), { length : 1 }, { length : 1 });
    myUtil.test(t, sd.length(1, 2), { length : 2 }, { length : 2 });

    myUtil.fail(t, sd.length(1, 2), { length : 3 });
    myUtil.fail(t, sd.length(1, 2), { length : 4 });
    myUtil.fail(t, sd.length(1, 2), { length : -1 });
    myUtil.fail(t, sd.length(1, 2), { length : -2 });
    myUtil.fail(t, sd.length(1, 2), { length : NaN });
    myUtil.fail(t, sd.length(1, 2), { length : Infinity });
    myUtil.fail(t, sd.length(1, 2), { length : -Infinity });
    myUtil.fail(t, sd.length(1, 2), { length : false });
    myUtil.fail(t, sd.length(1, 2), { length : true });
    myUtil.fail(t, sd.length(1, 2), { length : "0" });
    myUtil.fail(t, sd.length(1, 2), { length : "1" });

    t.end();
});
