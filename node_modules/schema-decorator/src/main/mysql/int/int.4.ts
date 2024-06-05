import * as sd from "../../assert-lib";
import { intDelegate } from "./int-util";

function intSigned () {
    return intDelegate(-2147483648, 2147483647);
}
intSigned.nullable = () => sd.nullable(intSigned());
export {intSigned}