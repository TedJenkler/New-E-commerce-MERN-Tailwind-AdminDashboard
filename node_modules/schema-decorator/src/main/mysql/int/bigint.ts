import * as sd from "../../assert-lib";
import {bigintDelegate} from "./bigint-util";

function bigint () {
    return bigintDelegate;
}
bigint.nullable = () => sd.nullable(bigint());
export {
    bigint,
};