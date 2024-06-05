import * as sd from "../../assert-lib";

const assertDouble = sd.or(
    sd.finiteNumber(),
    sd.stringToNumber()
);
export function double () {
    return assertDouble;
}
double.nullable = () => sd.nullable(double());