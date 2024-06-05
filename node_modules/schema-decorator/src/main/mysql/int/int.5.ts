import * as sd from "../../assert-lib";
import { intDelegate } from "./int-util";

function tinyIntUnsigned () {
    return intDelegate(0, 255);
}
tinyIntUnsigned.nullable = () => sd.nullable(tinyIntUnsigned());
export {tinyIntUnsigned}