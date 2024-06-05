import * as schema from "../../main/index";
//import * as validation from "@anyhowstep/data-validation";
import * as tape from "tape";
import * as myUtil from "./util";

tape("date", (t) => {
    class Foo {
        @schema.assert(schema.date())
        var : Date = new Date(0);
    }
    const d = new Date();
    myUtil.test(t, Foo, {
        var : d
    }, {
        var : d
    });
    t.end();
});
