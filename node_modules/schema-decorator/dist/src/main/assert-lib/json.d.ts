import { AssertDelegate } from "../types";
export declare function jsonObjectStr(): AssertDelegate<string> & {
    __accepts: string;
    __canAccept: string;
};
export declare function jsonObjectToString(): (AssertDelegate<string> & {
    __accepts: {
        [k: string]: any;
    };
});
export declare function jsonStringToObject(): (name: string, str: string) => {
    [k: string]: any;
};
export declare function jsonObject(): AssertDelegate<{
    [k: string]: any;
}> & {
    __accepts: string | {
        [k: string]: any;
    };
    __canAccept: string | {
        [k: string]: any;
    };
};
