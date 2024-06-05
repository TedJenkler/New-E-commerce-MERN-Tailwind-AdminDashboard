import * as sd from "../../../../dist/src/main";
import * as tape from "tape";
import * as myUtil from "../util";

tape(__filename, (t) => {
    myUtil.test(t, sd.mysql.bigint(), BigInt(32), BigInt(32));
    myUtil.test(t, sd.mysql.bigint(), 32, BigInt(32));
    myUtil.test(t, sd.mysql.bigint(), "32", BigInt(32));

    t.end();
});