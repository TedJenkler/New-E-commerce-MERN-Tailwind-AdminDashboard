declare function bigintSigned(): import("../..").AssertDelegate<bigint> & {
    __accepts: bigint;
    __canAccept: string | number | bigint;
};
declare namespace bigintSigned {
    var nullable: () => import("../..").AssertDelegate<bigint | null> & {
        __accepts: bigint | null;
        __canAccept: string | number | bigint | null;
    };
}
export { bigintSigned, };
