import * as sd from "../../../main/index";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename + "-number-to-boolean", (t) => {
    myUtil.test(t, sd.numberToBoolean(), 2, true);
    myUtil.test(t, sd.numberToBoolean(), 1, true);
    myUtil.test(t, sd.numberToBoolean(), 0.5, true);
    myUtil.test(t, sd.numberToBoolean(), 0, false);
    myUtil.test(t, sd.numberToBoolean(), -0.5, true);
    myUtil.test(t, sd.numberToBoolean(), -1, true);
    myUtil.test(t, sd.numberToBoolean(), -2, true);

    myUtil.test(t, sd.numberToBoolean(), true, true);
    myUtil.test(t, sd.numberToBoolean(), false, false);

    myUtil.fail(t, sd.numberToBoolean(), []);
    myUtil.fail(t, sd.numberToBoolean(), "0");
    myUtil.fail(t, sd.numberToBoolean(), "false");

    t.end();
});

tape(__filename + "-string-to-boolean", (t) => {
    myUtil.test(t, sd.stringToBoolean(), "true", true);
    myUtil.test(t, sd.stringToBoolean(), "TRUE", true);
    myUtil.test(t, sd.stringToBoolean(), "TrUe", true);
    myUtil.test(t, sd.stringToBoolean(), "tRuE", true);
    myUtil.test(t, sd.stringToBoolean(), "1", true);

    myUtil.test(t, sd.stringToBoolean(), "false", false);
    myUtil.test(t, sd.stringToBoolean(), "", false);
    myUtil.test(t, sd.stringToBoolean(), "2", false);

    myUtil.test(t, sd.stringToBoolean(), true, true);
    myUtil.test(t, sd.stringToBoolean(), false, false);

    myUtil.fail(t, sd.stringToBoolean(), []);
    myUtil.fail(t, sd.stringToBoolean(), 0);
    myUtil.fail(t, sd.stringToBoolean(), 1);

    t.end();
});

tape(__filename + "-number-to-true", (t) => {
    myUtil.test(t, sd.numberToTrue(), 2, true);
    myUtil.test(t, sd.numberToTrue(), 1, true);
    myUtil.test(t, sd.numberToTrue(), 0.5, true);
    myUtil.fail(t, sd.numberToTrue(), 0);
    myUtil.test(t, sd.numberToTrue(), -0.5, true);
    myUtil.test(t, sd.numberToTrue(), -1, true);
    myUtil.test(t, sd.numberToTrue(), -2, true);

    myUtil.test(t, sd.numberToTrue(), true, true);
    myUtil.fail(t, sd.numberToTrue(), false);

    myUtil.fail(t, sd.numberToTrue(), []);
    myUtil.fail(t, sd.numberToTrue(), "0");
    myUtil.fail(t, sd.numberToTrue(), "false");

    t.end();
});

tape(__filename + "-number-to-false", (t) => {
    myUtil.fail(t, sd.numberToFalse(), 2);
    myUtil.fail(t, sd.numberToFalse(), 1);
    myUtil.fail(t, sd.numberToFalse(), 0.5);
    myUtil.test(t, sd.numberToFalse(), 0, false);
    myUtil.fail(t, sd.numberToFalse(), -0.5);
    myUtil.fail(t, sd.numberToFalse(), -1);
    myUtil.fail(t, sd.numberToFalse(), -2);

    myUtil.fail(t, sd.numberToFalse(), true);
    myUtil.test(t, sd.numberToFalse(), false, false);

    myUtil.fail(t, sd.numberToFalse(), []);
    myUtil.fail(t, sd.numberToFalse(), "0");
    myUtil.fail(t, sd.numberToFalse(), "false");

    t.end();
});

tape(__filename + "-string-to-true", (t) => {
    myUtil.test(t, sd.stringToTrue(), "true", true);
    myUtil.test(t, sd.stringToTrue(), "TRUE", true);
    myUtil.test(t, sd.stringToTrue(), "TrUe", true);
    myUtil.test(t, sd.stringToTrue(), "tRuE", true);
    myUtil.test(t, sd.stringToTrue(), "1", true);

    myUtil.fail(t, sd.stringToTrue(), "false");
    myUtil.fail(t, sd.stringToTrue(), "");
    myUtil.fail(t, sd.stringToTrue(), "2");

    myUtil.test(t, sd.stringToTrue(), true, true);
    myUtil.fail(t, sd.stringToTrue(), false);

    myUtil.fail(t, sd.stringToTrue(), []);
    myUtil.fail(t, sd.stringToTrue(), 0);
    myUtil.fail(t, sd.stringToTrue(), 1);

    t.end();
});

tape(__filename + "-string-to-false", (t) => {
    myUtil.fail(t, sd.stringToFalse(), "true");
    myUtil.fail(t, sd.stringToFalse(), "TRUE");
    myUtil.fail(t, sd.stringToFalse(), "TrUe");
    myUtil.fail(t, sd.stringToFalse(), "tRuE");
    myUtil.fail(t, sd.stringToFalse(), "1");

    myUtil.test(t, sd.stringToFalse(), "false", false);
    myUtil.test(t, sd.stringToFalse(), "", false);
    myUtil.test(t, sd.stringToFalse(), "2", false);

    myUtil.fail(t, sd.stringToFalse(), true);
    myUtil.test(t, sd.stringToFalse(), false, false);

    myUtil.fail(t, sd.stringToFalse(), []);
    myUtil.fail(t, sd.stringToFalse(), 0);
    myUtil.fail(t, sd.stringToFalse(), 1);

    t.end();
});
