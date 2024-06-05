declare function float(): import("../..").AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace float {
    var nullable: () => import("../..").AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
export default float;
