import * as sd from "../../assert-lib";

export const assertBoolean = sd.or(
    sd.boolean(),
    sd.chain(
        sd.literal("0", "1", 0, 1, "false", "true"),
        (name : string, v : "0"|"1"|0|1|"false"|"true") => {
            switch (v) {
                case "0": return false;
                case "1": return true;
                case 0: return false;
                case 1: return true;
                case "false": return false;
                case "true": return true;
                default : {
                    //Shouldn't happen
                    throw new Error(`Expected ${name} to be one of '0'|'1'|0|1|'false'|'true'`);
                }
            }
        }
    )
);
export const assertTrue = sd.or(
    sd.literal(true),
    sd.chain(
        sd.literal("1", 1, "true"),
        (name : string, v : "1"|1|"true") => {
            switch (v) {
                case "1": return true;
                case 1: return true;
                case "true": return true;
                default : {
                    //Shouldn't happen
                    throw new Error(`Expected ${name} to be one of '1'|1|'true'`);
                }
            }
        }
    )
);
export const assertFalse = sd.or(
    sd.literal(false),
    sd.chain(
        sd.literal("0", 0, "false"),
        (name : string, v : "0"|0|"false") => {
            switch (v) {
                case "0": return false;
                case 0: return false;
                case "false": return false;
                default : {
                    //Shouldn't happen
                    throw new Error(`Expected ${name} to be one of '0'|0|'false'`);
                }
            }
        }
    )
);

export function boolean () {
    return assertBoolean;
}
boolean.nullable = () => sd.nullable(boolean());

function getTrue () {
    return assertTrue;
}
getTrue.nullable = () => sd.nullable(getTrue());
function getFalse () {
    return assertFalse;
}
getFalse.nullable = () => sd.nullable(getFalse());
export {
    getTrue as true,
    getFalse as false,
}