import * as sd from "../../assert-lib";
import { intDelegate } from "./int-util";

function mediumIntSigned () {
    return intDelegate(-8388608, 8388607);
}
mediumIntSigned.nullable = () => sd.nullable(mediumIntSigned());
export {mediumIntSigned};