import * as sd from "../../assert-lib";
import {unsafeIntDelegate} from "./int-util";

function unsafeInt () {
    return unsafeIntDelegate;
}
unsafeInt.nullable = () => sd.nullable(unsafeInt());
export {unsafeInt}