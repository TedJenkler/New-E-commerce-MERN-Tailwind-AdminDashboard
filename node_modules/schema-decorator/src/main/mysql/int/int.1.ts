import * as sd from "../../assert-lib";
import { intDelegate } from "./int-util";

function tinyIntSigned () {
    return intDelegate(-128, 127);
}
tinyIntSigned.nullable = () => sd.nullable(tinyIntSigned());
export {tinyIntSigned};