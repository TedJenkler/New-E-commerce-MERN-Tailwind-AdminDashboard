import {
    Field,
    AnyAssertFunc
} from "./types";

export type RawFieldCollection = { [name : string] : AnyAssertFunc };
export type FieldCollection<RawFieldCollectionT extends RawFieldCollection> = {
    [name in Extract<keyof RawFieldCollectionT, string>] : Field<name, RawFieldCollectionT[name]>
};

export function field<NameT extends string, F extends AnyAssertFunc> (
    name : NameT,
    assert : F
) : Field<NameT, F> {
    return new Field(name, assert);
}
export function fields<RawFieldCollectionT extends RawFieldCollection> (raw : RawFieldCollectionT) : FieldCollection<RawFieldCollectionT> {
    const result : any = {};
    for (let name in raw) {
        if (!raw.hasOwnProperty(name)) {
            continue;
        }
        result[name] = field(name, raw[name]);
    }
    return result;
}
