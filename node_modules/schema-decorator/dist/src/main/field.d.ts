import { Field, AnyAssertFunc } from "./types";
export declare type RawFieldCollection = {
    [name: string]: AnyAssertFunc;
};
export declare type FieldCollection<RawFieldCollectionT extends RawFieldCollection> = {
    [name in Extract<keyof RawFieldCollectionT, string>]: Field<name, RawFieldCollectionT[name]>;
};
export declare function field<NameT extends string, F extends AnyAssertFunc>(name: NameT, assert: F): Field<NameT, F>;
export declare function fields<RawFieldCollectionT extends RawFieldCollection>(raw: RawFieldCollectionT): FieldCollection<RawFieldCollectionT>;
