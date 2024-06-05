declare function bigintUnsigned(): import("../..").AssertDelegate<bigint> & {
    __accepts: bigint;
    __canAccept: string | number | bigint;
};
declare namespace bigintUnsigned {
    var nullable: () => import("../..").AssertDelegate<bigint | null> & {
        __accepts: bigint | null;
        __canAccept: string | number | bigint | null;
    };
}
export { bigintUnsigned, };
