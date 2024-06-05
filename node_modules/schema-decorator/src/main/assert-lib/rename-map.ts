/**
    Stolen from type-mapping.
*/
import {FieldCollection} from "../field";
import {
    AssertDelegate,
    Accepts,
    CanAccept,
    CanAcceptOf,
    AcceptsOf,
    TypeOf,
    AnyAssertFunc,
} from "../types";
import {rename, instanceOf} from "./object";
import {intersect, chain} from "./operator";

export type UnionToIntersection<U> = (
    (
        U extends any ? (k: U) => void : never
    ) extends (
        (k: infer I) => void
    ) ? I : never
);

export type MergedOutputOfImpl<F extends AnyAssertFunc> = (
    F extends AnyAssertFunc ?
    [TypeOf<F>] :
    never
);
export type MergedOutputOf<F extends AnyAssertFunc> = (
    Extract<
        UnionToIntersection<MergedOutputOfImpl<F>>,
        [any]
    >[0]
);

export type IsOptional<F extends AnyAssertFunc> = (
    undefined extends TypeOf<F> ?
    true :
    false
);

export type IsExpectedInputOptional<F extends AnyAssertFunc> = (
    undefined extends AcceptsOf<F> ?
    true :
    false
);

export type ExtractLiteralDstName<MapT extends FieldCollection<any>> = (
    {
        [key in Extract<keyof MapT, string>] : (
            string extends MapT[key]["name"] ?
            never :
            MapT[key]["name"]
        )
    }[Extract<keyof MapT, string>]
);

export type NonOptionalMappableInputKey<MapT extends FieldCollection<any>> = (
    {
        [k in Extract<keyof MapT, string>] : (
            IsOptional<MapT[k]> extends true ?
            never :
            k
        )
    }[Extract<keyof MapT, string>]
);
export type OptionalMappableInputKey<MapT extends FieldCollection<any>> = (
    {
        [k in Extract<keyof MapT, string>] : (
            IsOptional<MapT[k]> extends true ?
            k :
            never
        )
    }[Extract<keyof MapT, string>]
);

export type NonOptionalExpectedInputDstName<MapT extends FieldCollection<any>> = (
    {
        [k in ExtractLiteralDstName<MapT>] : (
            IsExpectedInputOptional<
                Extract<
                    MapT[Extract<keyof MapT, string>],
                    { name : k }
                >
            > extends true ?
            never :
            k
        )
    }[ExtractLiteralDstName<MapT>]
);
export type OptionalExpectedInputDstName<MapT extends FieldCollection<any>> = (
    {
        [k in ExtractLiteralDstName<MapT>] : (
            IsExpectedInputOptional<
                Extract<
                    MapT[Extract<keyof MapT, string>],
                    { name : k }
                >
            > extends true ?
            k :
            never
        )
    }[ExtractLiteralDstName<MapT>]
);
export type NonOptionalMappableInputDstName<MapT extends FieldCollection<any>> = (
    {
        [k in ExtractLiteralDstName<MapT>] : (
            IsOptional<
                Extract<
                    MapT[Extract<keyof MapT, string>],
                    { name : k }
                >
            > extends true ?
            never :
            k
        )
    }[ExtractLiteralDstName<MapT>]
);
export type OptionalMappableInputDstName<MapT extends FieldCollection<any>> = (
    {
        [k in ExtractLiteralDstName<MapT>] : (
            IsOptional<
                Extract<
                    MapT[Extract<keyof MapT, string>],
                    { name : k }
                >
            > extends true ?
            k :
            never
        )
    }[ExtractLiteralDstName<MapT>]
);
export type RenameMapMapper<MapT extends FieldCollection<any>> = (
    & AssertDelegate<
        & {
            [dst in ExtractLiteralDstName<MapT>] : (
                MergedOutputOf<
                    Extract<
                        MapT[Extract<keyof MapT, string>],
                        { name : dst }
                    >
                >
            )
        }
        & (
            string extends MapT[Extract<keyof MapT, string>]["name"] ?
            {
                [name : string] : (
                    | TypeOf<
                        Exclude<MapT[Extract<keyof MapT, string>], { name : ExtractLiteralDstName<MapT> }>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & Accepts<
        & (
            NonOptionalExpectedInputDstName<MapT> extends never ?
            unknown :
            {
                [dst in NonOptionalExpectedInputDstName<MapT>] : (
                    AcceptsOf<
                        Extract<
                            MapT[Extract<keyof MapT, string>],
                            { name : dst }
                        >
                    >
                )
            }
        )
        & (
            OptionalExpectedInputDstName<MapT> extends never ?
            unknown :
            {
                [dst in OptionalExpectedInputDstName<MapT>]? : (
                    AcceptsOf<
                        Extract<
                            MapT[Extract<keyof MapT, string>],
                            { name : dst }
                        >
                    >
                )
            }
        )
        & (
            string extends MapT[Extract<keyof MapT, string>]["name"] ?
            {
                [name : string] : (
                    | AcceptsOf<
                        Exclude<MapT[Extract<keyof MapT, string>], { name : ExtractLiteralDstName<MapT> }>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & CanAccept<
        | (
            & (
                NonOptionalMappableInputKey<MapT> extends never ?
                unknown :
                {
                    [src in NonOptionalMappableInputKey<MapT>] : (
                        CanAcceptOf<
                            MapT[src]
                        >
                    )
                }
            )
            & (
                OptionalMappableInputKey<MapT> extends never ?
                unknown :
                {
                    [src in OptionalMappableInputKey<MapT>]? : (
                        CanAcceptOf<
                            MapT[src]
                        >
                    )
                }
            )
        )
        | (
            & (
                NonOptionalMappableInputDstName<MapT> extends never ?
                unknown :
                {
                    [dst in NonOptionalMappableInputDstName<MapT>] : (
                        CanAcceptOf<
                            Extract<
                                MapT[Extract<keyof MapT, string>],
                                { name : dst }
                            >
                        >
                    )
                }
            )
            & (
                OptionalMappableInputDstName<MapT> extends never ?
                unknown :
                {
                    [dst in OptionalMappableInputDstName<MapT>]? : (
                        CanAcceptOf<
                            Extract<
                                MapT[Extract<keyof MapT, string>],
                                { name : dst }
                            >
                        >
                    )
                }
            )
            & (
                string extends MapT[Extract<keyof MapT, string>]["name"] ?
                {
                    [name : string] : (
                        | CanAcceptOf<
                            Exclude<MapT[Extract<keyof MapT, string>], { name : ExtractLiteralDstName<MapT> }>
                        >
                        | undefined
                    )
                } :
                unknown
            )
        )
    >
);
export function renameMap<MapT extends FieldCollection<any>> (
    map : MapT
) : (
    RenameMapMapper<MapT>
) {
    const arr : AssertDelegate<unknown>[] = [];
    for (let k in map) {
        if (!map.hasOwnProperty(k)) {
            continue;
        }
        const f = map[k];
        arr.push(rename(k, f));
    }
    if (arr.length == 0) {
        return (() => { return {}; }) as any;
    }
    return chain(
        instanceOf(Object),
        intersect(...(arr as any))
    ) as any;
}

export type PartialRenameMapMapper<MapT extends FieldCollection<any>> = (
    & AssertDelegate<
        & {
            [dst in ExtractLiteralDstName<MapT>] : (
                | MergedOutputOf<
                    Extract<
                        MapT[Extract<keyof MapT, string>],
                        { name : dst }
                    >
                >
                | undefined
            )
        }
        & (
            string extends MapT[Extract<keyof MapT, string>]["name"] ?
            {
                [name : string] : (
                    | TypeOf<
                        Exclude<MapT[Extract<keyof MapT, string>], { name : ExtractLiteralDstName<MapT> }>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & Accepts<
        & (
            NonOptionalExpectedInputDstName<MapT> extends never ?
            unknown :
            {
                [dst in NonOptionalExpectedInputDstName<MapT>]? : (
                    AcceptsOf<
                        Extract<
                            MapT[Extract<keyof MapT, string>],
                            { name : dst }
                        >
                    >
                )
            }
        )
        & (
            OptionalExpectedInputDstName<MapT> extends never ?
            unknown :
            {
                [dst in OptionalExpectedInputDstName<MapT>]? : (
                    AcceptsOf<
                        Extract<
                            MapT[Extract<keyof MapT, string>],
                            { name : dst }
                        >
                    >
                )
            }
        )
        & (
            string extends MapT[Extract<keyof MapT, string>]["name"] ?
            {
                [name : string] : (
                    | AcceptsOf<
                        Exclude<MapT[Extract<keyof MapT, string>], { name : ExtractLiteralDstName<MapT> }>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & CanAccept<
        | (
            & (
                NonOptionalMappableInputKey<MapT> extends never ?
                unknown :
                {
                    [src in NonOptionalMappableInputKey<MapT>]? : (
                        CanAcceptOf<
                            MapT[src]
                        >
                    )
                }
            )
            & (
                OptionalMappableInputKey<MapT> extends never ?
                unknown :
                {
                    [src in OptionalMappableInputKey<MapT>]? : (
                        CanAcceptOf<
                            MapT[src]
                        >
                    )
                }
            )
        )
        | (
            & (
                NonOptionalMappableInputDstName<MapT> extends never ?
                unknown :
                {
                    [dst in NonOptionalMappableInputDstName<MapT>]? : (
                        CanAcceptOf<
                            Extract<
                                MapT[Extract<keyof MapT, string>],
                                { name : dst }
                            >
                        >
                    )
                }
            )
            & (
                OptionalMappableInputDstName<MapT> extends never ?
                unknown :
                {
                    [dst in OptionalMappableInputDstName<MapT>]? : (
                        CanAcceptOf<
                            Extract<
                                MapT[Extract<keyof MapT, string>],
                                { name : dst }
                            >
                        >
                    )
                }
            )
            & (
                string extends MapT[Extract<keyof MapT, string>]["name"] ?
                {
                    [name : string] : (
                        | CanAcceptOf<
                            Exclude<MapT[Extract<keyof MapT, string>], { name : ExtractLiteralDstName<MapT> }>
                        >
                        | undefined
                    )
                } :
                unknown
            )
        )
    >
);
export function partialRenameMap<MapT extends FieldCollection<any>> (
    map : MapT
) : (
    PartialRenameMapMapper<MapT>
) {
    const arr : AssertDelegate<unknown>[] = [];
    for (let k in map) {
        if (!map.hasOwnProperty(k)) {
            continue;
        }
        const f = map[k];
        arr.push(rename(k, f.optional()));
    }
    if (arr.length == 0) {
        return (() => { return {}; }) as any;
    }
    return chain(
        instanceOf(Object),
        intersect(...(arr as any))
    ) as any;
}
