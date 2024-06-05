import {AssertDelegate} from "../types";
import {chain, and} from "./operator";
import {string, literal} from "./basic";
import {finiteNumber, integer, naturalNumber} from "./number";
import {cast} from "./cast";
import {length} from "./array-like";
import {validDate} from "./date";

export function finiteNumberString () {
    return chain(
        string(),
        (name : string, str : string) : string => {
            const toCheck = parseFloat(str);
            finiteNumber()(`${name}'s number value`, toCheck);
            return str;
        }
    );
}
export function integerString () {
    return chain(
        string(),
        (name : string, str : string) : string => {
            const toCheck = parseFloat(str);
            integer()(`${name}'s number value`, toCheck);
            return str;
        }
    );
}
export function naturalNumberString () {
    return chain(
        string(),
        (name : string, str : string) : string => {
            const toCheck = parseFloat(str);
            naturalNumber()(`${name}'s number value`, toCheck);
            return str;
        }
    );
}

export function stringToNumber () {
    return cast(
        finiteNumberString(),
        parseFloat,
        finiteNumber()
    );
}
export function stringToInteger () {
    return cast(
        integerString(),
        parseInt,
        integer()
    );
}
export function stringToNaturalNumber () {
    return cast(
        naturalNumberString(),
        parseInt,
        naturalNumber()
    );
}

export function stringLength (max : number) : AssertDelegate<string>;
export function stringLength (min : number, max : number) : AssertDelegate<string>;
export function stringLength (arg0 : number, arg1? : number) : AssertDelegate<string>;
export function stringLength (arg0 : number, arg1? : number) : AssertDelegate<string> {
    return and(
        string(),
        length(arg0, arg1)
    );
}

export function varChar (max : number) : AssertDelegate<string>;
export function varChar (min : number, max : number) : AssertDelegate<string>;
export function varChar (arg0 : number, arg1? : number) : AssertDelegate<string>;
export function varChar (arg0 : number, arg1? : number) : AssertDelegate<string> {
    return stringLength(arg0, arg1);
}

export function char (length : number) {
    return stringLength(length, length);
}

export function match (regex : RegExp, errorMessageDelegate? : (name : string) => string) {
    return chain(
        string(),
        (name : string, mixed : string) : string => {
            if (regex.test(mixed)) {
                return mixed;
            } else {
                if (errorMessageDelegate == undefined) {
                    throw new Error(`${name} does not match ${regex.source}`);
                } else {
                    throw new Error(errorMessageDelegate(name));
                }
            }
        }
    );
}

export function nonMatch (regex : RegExp, errorMessageDelegate? : (name : string) => string) {
    return chain(
        string(),
        (name : string, mixed : string) : string => {
            if (regex.test(mixed)) {
                if (errorMessageDelegate == undefined) {
                    throw new Error(`${name} MUST NOT match ${regex.source}`);
                } else {
                    throw new Error(errorMessageDelegate(name));
                }
            } else {
                return mixed;
            }
        }
    );
}

export function email () : AssertDelegate<string> {
    return match(
        /^.+@.+$/,
        name => `${name} must be an email address`
    );
}

//Allows empty string
//Allows uppercase A-F
//Allows lowercase A-F
export function hexadecimalString () {
    return match(
        /^[a-fA-F0-9]*$/,
        name => `${name} must be a hexadecimal string`
    );
}

//https://dev.mysql.com/doc/refman/8.0/en/storage-requirements.html
export function tinyText () {
    return varChar(255); //2^8-1
}
export function text () {
    return varChar(65_535); //2^16-1
}
export function mediumText () {
    return varChar(16_777_215); //2^24-1
}
export function longText () {
    return varChar(4_294_967_295); //2^32-1
}

export function toUpperCase () {
    return chain(
        string(),
        (_name : string, str : string) : string => {
            return str.toUpperCase();
        }
    )
}

export function toLowerCase () {
    return chain(
        string(),
        (_name : string, str : string) : string => {
            return str.toLowerCase();
        }
    )
}

//The `char` must be a single character or an error is thrown
export function padLeft (minLength : number, char : string) {
    if (char.length != 1) {
        throw new Error(`"char" must be one character; received ${char}`);
    }
    return chain(
        string(),
        (_name : string, str : string) : string => {
            if (str.length >= minLength) {
                return str;
            }
            return char.repeat(minLength - str.length) + str;
        }
    );
}

//The `char` must be a single character or an error is thrown
export function padRight (minLength : number, char : string) {
    if (char.length != 1) {
        throw new Error(`"char" must be one character; received ${char}`);
    }
    return chain(
        string(),
        (_name : string, str : string) : string => {
            if (str.length >= minLength) {
                return str;
            }
            return str + char.repeat(minLength - str.length);
        }
    );
}

export function subStringBlacklist (blacklist : string[], configuration : {
    //Defaults to false
    caseInsensitive? : boolean
} = {}) {
    const caseInsensitive = (configuration.caseInsensitive === true);

    if (caseInsensitive) {
        blacklist = blacklist.map(
            subString => subString.toLowerCase()
        );
    }
    return chain(
        string(),
        (name : string, str : string) : string => {
            if (caseInsensitive) {
                str = str.toLowerCase();
            }

            const found : string[] = [];
            for (let subString of blacklist) {
                if (str.indexOf(subString) >= 0) {
                    found.push(subString);
                }
            }

            if (found.length == 0) {
                return str;
            } else {
                throw new Error(`${name} cannot contain the following: ${blacklist.join(", ")}; found ${found.join(", ")}`);
            }
        }
    );
}

export function dateString () {
    return chain(
        string(),
        (name : string, str : string) => {
            validDate()(name, new Date(str));
            return str;
        }
    );
}

export function toTrimmed () {
    return chain(
        string(),
        (_name : string, str : string) => {
            return str.trim();
        }
    );
}

export function emptyStringToUndef () {
    return chain(
        literal(""),
        (_name : string, _str : "") => {
            return undefined;
        }
    );
}
export function emptyStringToNull () {
    return chain(
        literal(""),
        (_name : string, _str : "") => {
            return null;
        }
    );
}
//An empty string, or a string of only whitespace
export function whitespaceStringToUndef () {
    return chain(
        match(/^\s*$/, name => `Expected ${name} to be a whitespace string`),
        (_name : string, _str : string) => {
            return undefined;
        }
    )
}
//An empty string, or a string of only whitespace
export function whitespaceStringToNull () {
    return chain(
        match(/^\s*$/, name => `Expected ${name} to be a whitespace string`),
        (_name : string, _str : string) => {
            return null;
        }
    )
}