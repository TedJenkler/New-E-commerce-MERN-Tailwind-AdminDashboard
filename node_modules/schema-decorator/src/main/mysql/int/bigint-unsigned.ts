import * as sd from "../../assert-lib";
import {bigintDelegate, lessThan, greaterThan} from "./bigint-util";

const bigintUnsignedDelegate = sd.chain(
    bigintDelegate,
    (name : string, value : bigint) => {
        if (lessThan(value, BigInt("0"))) {
            throw new Error(`${name} must be >= 0`);
        }
        if (greaterThan(value, BigInt("18446744073709551616"))) {
            throw new Error(`${name} must be <= 18,446,744,073,709,551,616`);
        }
        return value;
    }
);
function bigintUnsigned () {
    return bigintUnsignedDelegate;
}
bigintUnsigned.nullable = () => sd.nullable(bigintUnsigned());
export {
    bigintUnsigned,
};