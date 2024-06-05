import { AssertDelegate } from "../types";
export declare function finiteNumberString(): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function integerString(): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function naturalNumberString(): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function stringToNumber(): AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
export declare function stringToInteger(): AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
export declare function stringToNaturalNumber(): AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
export declare function stringLength(max: number): AssertDelegate<string>;
export declare function stringLength(min: number, max: number): AssertDelegate<string>;
export declare function stringLength(arg0: number, arg1?: number): AssertDelegate<string>;
export declare function varChar(max: number): AssertDelegate<string>;
export declare function varChar(min: number, max: number): AssertDelegate<string>;
export declare function varChar(arg0: number, arg1?: number): AssertDelegate<string>;
export declare function char(length: number): AssertDelegate<string>;
export declare function match(regex: RegExp, errorMessageDelegate?: (name: string) => string): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function nonMatch(regex: RegExp, errorMessageDelegate?: (name: string) => string): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function email(): AssertDelegate<string>;
export declare function hexadecimalString(): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function tinyText(): AssertDelegate<string>;
export declare function text(): AssertDelegate<string>;
export declare function mediumText(): AssertDelegate<string>;
export declare function longText(): AssertDelegate<string>;
export declare function toUpperCase(): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function toLowerCase(): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function padLeft(minLength: number, char: string): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function padRight(minLength: number, char: string): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function subStringBlacklist(blacklist: string[], configuration?: {
    caseInsensitive?: boolean;
}): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function dateString(): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function toTrimmed(): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function emptyStringToUndef(): AssertDelegate<undefined> & {
    __accepts: "";
    __canAccept: "";
};
export declare function emptyStringToNull(): AssertDelegate<null> & {
    __accepts: "";
    __canAccept: "";
};
export declare function whitespaceStringToUndef(): AssertDelegate<undefined> & {
    __accepts: string;
    __canAccept: string;
};
export declare function whitespaceStringToNull(): AssertDelegate<null> & {
    __accepts: string;
    __canAccept: string;
};
