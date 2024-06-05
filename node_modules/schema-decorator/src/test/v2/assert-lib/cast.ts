import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-cast", (t) => {
    const cast = sd.cast(
        (name, mixed) => {
            if (typeof mixed == "string" && /^\d{1,15}$/.test(mixed)) {
                return mixed;
            }
            throw new Error(`Expected ${name} to be a numeric string of 1-15 digits`);
        },
        (str : string) => {
            return parseInt(str);
        },
        (name, mixed) => {
            if (typeof mixed != "number") {
                throw new Error(`Expected ${name} to be a number`);
            }

            if (mixed < 0) {
                throw new Error(`Expected ${name} to be greater than or equal to zero`);
            }

            if (Math.floor(mixed) != mixed) {
                throw new Error(`Expected ${name} to be an integer`);
            }

            return mixed;
        }
    );
    myUtil.test(t, cast, 0, 0);
    myUtil.test(t, cast, "0", 0);
    myUtil.test(t, cast, 1, 1);
    myUtil.test(t, cast, "1", 1);
    myUtil.test(t, cast, 999999999999999, 999999999999999);
    myUtil.test(t, cast, "999999999999999", 999999999999999);

    myUtil.fail(t, cast, -1);
    myUtil.fail(t, cast, "-1");
    myUtil.fail(t, cast, 0.1);
    myUtil.fail(t, cast, "0.1");
    myUtil.fail(t, cast, 1.1);
    myUtil.fail(t, cast, "1.1");

    myUtil.fail(t, cast, true);
    myUtil.fail(t, cast, false);
    myUtil.fail(t, cast, []);

    t.end();
});

//TODO Think of a good test for this
tape(__filename + "-cast-first", (t) => {
    const cast = sd.castFirst(
        (name, mixed) => {
            if (typeof mixed == "string" && /^\d{1,15}$/.test(mixed)) {
                return mixed;
            }
            throw new Error(`Expected ${name} to be a numeric string of 1-15 digits`);
        },
        (str : string) => {
            return parseInt(str);
        },
        (name, mixed) => {
            if (typeof mixed != "number") {
                throw new Error(`Expected ${name} to be a number`);
            }

            if (mixed < 0) {
                throw new Error(`Expected ${name} to be greater than or equal to zero`);
            }

            if (Math.floor(mixed) != mixed) {
                throw new Error(`Expected ${name} to be an integer`);
            }

            return mixed;
        }
    );
    myUtil.test(t, cast, 0, 0);
    myUtil.test(t, cast, "0", 0);
    myUtil.test(t, cast, 1, 1);
    myUtil.test(t, cast, "1", 1);
    myUtil.test(t, cast, 999999999999999, 999999999999999);
    myUtil.test(t, cast, "999999999999999", 999999999999999);

    myUtil.fail(t, cast, -1);
    myUtil.fail(t, cast, "-1");
    myUtil.fail(t, cast, 0.1);
    myUtil.fail(t, cast, "0.1");
    myUtil.fail(t, cast, 1.1);
    myUtil.fail(t, cast, "1.1");

    myUtil.fail(t, cast, true);
    myUtil.fail(t, cast, false);
    myUtil.fail(t, cast, []);

    t.end();
});
