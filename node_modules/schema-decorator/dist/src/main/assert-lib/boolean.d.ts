export declare function numberToBoolean(): import("..").AssertDelegate<boolean> & {
    __accepts: boolean;
    __canAccept: number | boolean;
};
export declare function stringToBoolean(): import("..").AssertDelegate<boolean> & {
    __accepts: boolean;
    __canAccept: string | boolean;
};
export declare function numberToTrue(): import("..").AssertDelegate<true> & {
    __accepts: true;
    __canAccept: number | boolean;
};
export declare function numberToFalse(): import("..").AssertDelegate<false> & {
    __accepts: false;
    __canAccept: number | boolean;
};
export declare function stringToTrue(): import("..").AssertDelegate<true> & {
    __accepts: true;
    __canAccept: string | boolean;
};
export declare function stringToFalse(): import("..").AssertDelegate<false> & {
    __accepts: false;
    __canAccept: string | boolean;
};
