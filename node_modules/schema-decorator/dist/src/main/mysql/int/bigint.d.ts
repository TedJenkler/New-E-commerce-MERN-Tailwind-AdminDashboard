declare function bigint(): import("../..").AssertDelegate<bigint> & {
    __accepts: string | number | bigint;
    __canAccept: string | number | bigint;
};
declare namespace bigint {
    var nullable: () => import("../..").AssertDelegate<bigint | null> & {
        __accepts: string | number | bigint | null;
        __canAccept: string | number | bigint | null;
    };
}
export { bigint, };
