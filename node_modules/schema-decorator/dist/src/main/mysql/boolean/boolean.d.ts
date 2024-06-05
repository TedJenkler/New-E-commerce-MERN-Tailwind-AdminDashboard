export declare const assertBoolean: import("../..").AssertDelegate<boolean> & {
    __accepts: boolean | 0 | 1 | "0" | "1" | "true" | "false";
    __canAccept: boolean | 0 | 1 | "0" | "1" | "true" | "false";
};
export declare const assertTrue: import("../..").AssertDelegate<boolean> & {
    __accepts: true | 1 | "1" | "true";
    __canAccept: true | 1 | "1" | "true";
};
export declare const assertFalse: import("../..").AssertDelegate<boolean> & {
    __accepts: false | 0 | "0" | "false";
    __canAccept: false | 0 | "0" | "false";
};
declare function boolean(): import("../..").AssertDelegate<boolean> & {
    __accepts: boolean | 0 | 1 | "0" | "1" | "true" | "false";
    __canAccept: boolean | 0 | 1 | "0" | "1" | "true" | "false";
};
declare namespace boolean {
    var nullable: () => import("../..").AssertDelegate<boolean | null> & {
        __accepts: boolean | 0 | 1 | "0" | "1" | "true" | "false" | null;
        __canAccept: boolean | 0 | 1 | "0" | "1" | "true" | "false" | null;
    };
}
export default boolean;
declare function getTrue(): import("../..").AssertDelegate<boolean> & {
    __accepts: true | 1 | "1" | "true";
    __canAccept: true | 1 | "1" | "true";
};
declare namespace getTrue {
    var nullable: () => import("../..").AssertDelegate<boolean | null> & {
        __accepts: true | 1 | "1" | "true" | null;
        __canAccept: true | 1 | "1" | "true" | null;
    };
}
declare function getFalse(): import("../..").AssertDelegate<boolean> & {
    __accepts: false | 0 | "0" | "false";
    __canAccept: false | 0 | "0" | "false";
};
declare namespace getFalse {
    var nullable: () => import("../..").AssertDelegate<boolean | null> & {
        __accepts: false | 0 | "0" | "false" | null;
        __canAccept: false | 0 | "0" | "false" | null;
    };
}
export { getTrue as true, getFalse as false, };
