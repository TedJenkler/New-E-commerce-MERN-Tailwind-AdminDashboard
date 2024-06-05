import * as sd from "../../assert-lib";
import { intDelegate } from "./int-util";

function intUnsigned () {
    return intDelegate(0, 4294967295);
}
intUnsigned.nullable = () => sd.nullable(intUnsigned());
export {intUnsigned}