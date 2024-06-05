export declare const bigintDelegate: import("../..").AssertDelegate<bigint> & {
    __accepts: string | number | bigint;
    __canAccept: string | number | bigint;
};
export declare function lessThan(a: bigint, b: bigint): boolean;
export declare function greaterThan(a: bigint, b: bigint): boolean;
