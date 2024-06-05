import * as sd from "../../assert-lib";
import { intDelegate } from "./int-util";

function smallIntSigned () {
    return intDelegate(-32768, 32767);
}
smallIntSigned.nullable = () => sd.nullable(smallIntSigned());
export {smallIntSigned};