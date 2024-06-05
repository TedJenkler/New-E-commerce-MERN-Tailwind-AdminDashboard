declare function mediumIntSigned(): import("../..").AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace mediumIntSigned {
    var nullable: () => import("../..").AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
export { mediumIntSigned };
