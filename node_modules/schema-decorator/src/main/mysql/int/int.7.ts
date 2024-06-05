import * as sd from "../../assert-lib";
import { intDelegate } from "./int-util";

function mediumIntUnsigned () {
    return intDelegate(0, 16777215);
}
mediumIntUnsigned.nullable = () => sd.nullable(mediumIntUnsigned());
export {mediumIntUnsigned}