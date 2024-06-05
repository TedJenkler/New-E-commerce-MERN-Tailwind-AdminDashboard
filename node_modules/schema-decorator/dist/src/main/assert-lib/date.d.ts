export declare function validDate(): (name: string, mixed: unknown) => Date;
export declare function date(): import("..").AssertDelegate<Date> & {
    __accepts: Date;
    __canAccept: string | number | Date;
};
export declare function dateToUnixTimestamp(): import("..").AssertDelegate<number> & {
    __accepts: Date;
    __canAccept: string | number | Date;
};
export declare function unixTimestampToDateTimestamp(): import("..").AssertDelegate<number> & {
    __accepts: number;
    __canAccept: number;
};
export declare function unixTimestampToDate(): import("..").AssertDelegate<Date> & {
    __accepts: number;
    __canAccept: number;
};
export declare function dateTimeWithoutMillisecond(): import("..").AssertDelegate<Date> & {
    __accepts: Date;
    __canAccept: string | number | Date;
};
export declare function dateTime(): import("..").AssertDelegate<Date> & {
    __accepts: Date;
    __canAccept: string | number | Date;
};
export declare function dateTimeWithMillisecond(): import("..").AssertDelegate<Date> & {
    __accepts: Date;
    __canAccept: string | number | Date;
};
export declare function dateTime3(): import("..").AssertDelegate<Date> & {
    __accepts: Date;
    __canAccept: string | number | Date;
};
