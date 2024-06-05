import * as sd from "../../main/index";
import * as tape from "tape";

tape(__filename + "-is-literal-or-date", (t) => {
    t.true(sd.isLiteralOrDate(null));
    t.true(sd.isLiteralOrDate(undefined));
    t.true(sd.isLiteralOrDate(true));
    t.true(sd.isLiteralOrDate(false));
    t.true(sd.isLiteralOrDate(1));
    t.true(sd.isLiteralOrDate(NaN));
    t.true(sd.isLiteralOrDate(Infinity));
    t.true(sd.isLiteralOrDate(-Infinity));
    t.true(sd.isLiteralOrDate(new Date()));
    t.false(sd.isLiteralOrDate(() => {}));
    t.false(sd.isLiteralOrDate({}));
    t.false(sd.isLiteralOrDate([]));

    t.end();
});
