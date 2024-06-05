import * as sd from "../../assert-lib";
import { intDelegate } from "./int-util";

function smallIntUnsigned () {
    return intDelegate(0, 65535);
}
smallIntUnsigned.nullable = () => sd.nullable(smallIntUnsigned());
export {smallIntUnsigned}