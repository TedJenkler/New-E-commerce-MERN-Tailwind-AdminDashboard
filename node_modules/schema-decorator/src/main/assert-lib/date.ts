import {finiteNumber} from "./number";
import {chain, or} from "./operator";
import {cast} from "./cast";
import {string} from "./basic";
import {number, integer} from "./number";
import {toTypeStr} from "../util";

//Only checks if Date
export function validDate () {
    return (name : string, mixed : unknown) : Date => {
        if (!(mixed instanceof Date)) {
            throw new Error(`Expected ${name} to be a Date; received ${toTypeStr(mixed)}`);
        }
        const timestamp = mixed.getTime();
        finiteNumber()(`${name}'s Unix timestamp`, timestamp);
        return mixed;
    };
}

//Converts string|number to Date
export function date () {
    return or(
        cast(
            string(),
            (from) => new Date(from),
            validDate()
        ),
        cast(
            number(),
            (from) => new Date(from),
            validDate()
        ),
        validDate()
    );
}

//Given a valid date,
//this will give you the number of *seconds* since the Unix Epoch,
//January 1st, 1970 at UTC.
export function dateToUnixTimestamp () {
    return chain(
        date(),
        (_name : string, d : Date) : number => {
            return Math.floor(d.getTime() / 1000);
        }
    );
}

//A Unix timestamp only has the number of seconds since Unix Epoch,
//but new Date() expects it to be the number of milliseconds since Unix Epoch.
//Multiply by 1000 to convert back to milliseconds (but the millesecond part will be zeroes)
export function unixTimestampToDateTimestamp () {
    return chain(
        integer(),
        (_name : string, unixTimestamp : number) : number => {
            return unixTimestamp * 1000;
        }
    );
}

export function unixTimestampToDate () {
    return chain(
        unixTimestampToDateTimestamp(),
        (_name : string, dateTimestamp : number) : Date => {
            const d = new Date(dateTimestamp);
            return d;
        }
    );
}

export function dateTimeWithoutMillisecond () {
    return chain(
        dateToUnixTimestamp(),
        unixTimestampToDate()
    );
}
//Behaves like MySQL DATETIME, alias for dateTimeWithoutMillisecond()
export function dateTime () {
    return dateTimeWithoutMillisecond();
}

//Alias for date()
export function dateTimeWithMillisecond () {
    return date();
}
//Behaves like MySQL DATETIME(3), alias for date()
export function dateTime3 () {
    return date();
}
