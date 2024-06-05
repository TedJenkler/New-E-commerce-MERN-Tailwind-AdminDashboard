import * as sd from "../../assert-lib";
import {bigintDelegate, lessThan, greaterThan} from "./bigint-util";

const bigintSignedDelegate = sd.chain(
    bigintDelegate,
    (name : string, value : bigint) => {
        if (lessThan(value, BigInt("-9223372036854775808"))) {
            throw new Error(`${name} must be >= -9,223,372,036,854,775,808`);
        }
        if (greaterThan(value, BigInt("9223372036854775807"))) {
            throw new Error(`${name} must be <= 9,223,372,036,854,775,807`);
        }
        return value;
    }
);
function bigintSigned () {
    return bigintSignedDelegate;
}
bigintSigned.nullable = () => sd.nullable(bigintSigned());

export {
    bigintSigned,
};