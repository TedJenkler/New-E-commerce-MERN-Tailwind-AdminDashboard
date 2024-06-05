import {cast} from "./cast";
import {finiteNumber} from "./number";
import {boolean, string, literal, unknown} from "./basic";
import {chain} from "./operator";

export function numberToBoolean () {
    return cast(
        finiteNumber(),
        (raw : number) => {
            return (raw != 0);
        },
        boolean()
    );
}
export function stringToBoolean () {
    return cast(
        string(),
        (raw : string) => {
            if (raw == "1" || raw.toLowerCase() == "true") {
                return true;
            } else {
                return false;
            }
        },
        boolean()
    );
}

export function numberToTrue () {
    return chain(
        numberToBoolean(),
        unknown(),
        literal(true)
    );
}
export function numberToFalse () {
    return chain(
        numberToBoolean(),
        unknown(),
        literal(false)
    );
}

export function stringToTrue () {
    return chain(
        stringToBoolean(),
        unknown(),
        literal(true)
    );
}
export function stringToFalse () {
    return chain(
        stringToBoolean(),
        unknown(),
        literal(false)
    );
}