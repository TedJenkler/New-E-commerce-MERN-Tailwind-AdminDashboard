export declare type Decimal = string;
declare function decimal(): import("../..").AssertDelegate<string> & {
    __accepts: string | number;
    __canAccept: string | number;
};
declare namespace decimal {
    var nullable: () => import("../..").AssertDelegate<string | null> & {
        __accepts: string | number | null;
        __canAccept: string | number | null;
    };
}
export default decimal;
