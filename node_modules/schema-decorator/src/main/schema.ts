import {Field, AnyField, AssertDelegate, TypeOf, AcceptsOf, CanAcceptOf} from "./types";
import {RawFieldCollection, fields} from "./field";
import { toTypeStr } from "./util";
import {Merge} from "./Merge";

/*
This is necessary for the type inference to work correctly with deeper schema nesting, unfortunately...

function schemaField (i) {
return `(undefined extends TypeOf<F${i}> ?
    { [k in F${i}["name"]]+? : TypeOf<F${i}> } :
    { [k in F${i}["name"]] : TypeOf<F${i}> })`.replace(/\s{2,}/g, "")
}
function acceptsField (i) {
return `(undefined extends AcceptsOf<F${i}> ?
    { [k in F${i}["name"]]+? : AcceptsOf<F${i}> } :
    { [k in F${i}["name"]] : AcceptsOf<F${i}> })`.replace(/\s{2,}/g, "")
}
function genSchema (max) {
    function gen (n) {
        let args0 = [];
        let args1 = [];
        let args2 = [];
        let args3 = [];
        for (let i=0; i<n; ++i) {
            args0.push(`F${i} extends AnyField`);
            args1.push(`f${i} : F${i}`);
            args2.push(schemaField(i));
            args3.push(acceptsField(i));
        }
        return `export function schema<${args0.join(", ")}> (${args1.join(", ")}) : (
    AssertDelegate<${args2.join("&")}> &
	{
		__accepts : (
			${args3.join(" &\n\t\t\t")}
		)
	}
);`;
    }
    arr = [];
    for (let i=1; i<=max; ++i) {
        arr.push(gen(i));
    }
    return arr.join("\n").replace(/\t/g, "    ");
}
genSchema(50)
*/

export type OptionalTypeNames<Arr extends AnyField[]> = (
    Extract<
        {
            [index in Exclude<keyof Arr, keyof any[]>] : (
                Arr[index] extends AnyField ?
                    (
                        undefined extends TypeOf<Arr[index]> ?
                            Arr[index]["name"] :
                            never
                    ) :
                    never
            )
        }[Exclude<keyof Arr, keyof any[]>],
        string
    >
);
export type RequiredTypeNames<Arr extends AnyField[]> = (
    Extract<
        {
            [index in Exclude<keyof Arr, keyof any[]>] : (
                Arr[index] extends AnyField ?
                    (
                        undefined extends TypeOf<Arr[index]> ?
                            never :
                            Arr[index]["name"]
                    ) :
                    never
            )
        }[Exclude<keyof Arr, keyof any[]>],
        string
    >
);
export type OptionalAcceptsNames<Arr extends AnyField[]> = (
    Extract<
        {
            [index in Exclude<keyof Arr, keyof any[]>] : (
                Arr[index] extends AnyField ?
                    (
                        undefined extends AcceptsOf<Arr[index]> ?
                            Arr[index]["name"] :
                            never
                    ) :
                    never
            )
        }[Exclude<keyof Arr, keyof any[]>],
        string
    >
);
export type RequiredAcceptsNames<Arr extends AnyField[]> = (
    Extract<
        {
            [index in Exclude<keyof Arr, keyof any[]>] : (
                Arr[index] extends AnyField ?
                    (
                        undefined extends AcceptsOf<Arr[index]> ?
                            never :
                            Arr[index]["name"]
                    ) :
                    never
            )
        }[Exclude<keyof Arr, keyof any[]>],
        string
    >
);
export type OptionalCanAcceptNames<Arr extends AnyField[]> = (
    Extract<
        {
            [index in Exclude<keyof Arr, keyof any[]>] : (
                Arr[index] extends AnyField ?
                    (
                        undefined extends CanAcceptOf<Arr[index]> ?
                            Arr[index]["name"] :
                            never
                    ) :
                    never
            )
        }[Exclude<keyof Arr, keyof any[]>],
        string
    >
);
export type RequiredCanAcceptNames<Arr extends AnyField[]> = (
    Extract<
        {
            [index in Exclude<keyof Arr, keyof any[]>] : (
                Arr[index] extends AnyField ?
                    (
                        undefined extends CanAcceptOf<Arr[index]> ?
                            never :
                            Arr[index]["name"]
                    ) :
                    never
            )
        }[Exclude<keyof Arr, keyof any[]>],
        string
    >
);
export type FieldWithName<Arr extends AnyField[], NameT extends string> = (
    {
        [index in Exclude<keyof Arr, keyof any[]>] : (
            Arr[index] extends AnyField ?
                (
                    Arr[index]["name"] extends NameT ?
                        Arr[index] :
                        never
                ) :
                never
        )
    }[Exclude<keyof Arr, keyof any[]>]
);
export type SchemaType<Arr extends AnyField[]> = (
    {
        [requiredName in RequiredTypeNames<Arr>] : (
            TypeOf<FieldWithName<Arr, Extract<requiredName, string>>>
        )
    } &
    {
        [optionalName in OptionalTypeNames<Arr>]? : (
            TypeOf<FieldWithName<Arr, Extract<optionalName, string>>>
        )
    }
);
export type SchemaAccepts<Arr extends AnyField[]> = (
    {
        [requiredName in RequiredAcceptsNames<Arr>] : (
            AcceptsOf<FieldWithName<Arr, Extract<requiredName, string>>>
        )
    } &
    {
        [optionalName in OptionalAcceptsNames<Arr>]? : (
            AcceptsOf<FieldWithName<Arr, Extract<optionalName, string>>>
        )
    }
);
export type SchemaCanAccept<Arr extends AnyField[]> = (
    {
        [requiredName in RequiredCanAcceptNames<Arr>] : (
            CanAcceptOf<FieldWithName<Arr, Extract<requiredName, string>>>
        )
    } &
    {
        [optionalName in OptionalCanAcceptNames<Arr>]? : (
            CanAcceptOf<FieldWithName<Arr, Extract<optionalName, string>>>
        )
    }
);

export function schema<Arr extends AnyField[]> (...fields : Arr) : (
    AssertDelegate<Merge<SchemaType<Arr>>> &
    {
        __accepts : Merge<SchemaAccepts<Arr>>,
        __canAccept : Merge<SchemaCanAccept<Arr>>,
    }
) {
    const d = (name : string, mixed : any) : any => {
        if (!(mixed instanceof Object) || (mixed instanceof Date) || (mixed instanceof Array)) {
            throw new Error(`Expected ${name} to be an object; received ${toTypeStr(mixed)}`);
        }
        const result : any = {};
        for (let f of fields) {
            result[f.name] = f.assertDelegate(`${name}.${f.name}`, mixed[f.name]);
        }
        return result;
    };
    return d as any;
}

export function partialSchema<Arr extends AnyField[]> (...fields : Arr) : (
    AssertDelegate<
        {
            [requiredName in RequiredTypeNames<Arr>] : (
                TypeOf<FieldWithName<Arr, Extract<requiredName, string>>>|undefined
            )
        } &
        {
            [optionalName in OptionalTypeNames<Arr>] : (
                TypeOf<FieldWithName<Arr, Extract<optionalName, string>>>|undefined
            )
        }
    > &
    {
        __accepts : (
            {
                [requiredName in RequiredAcceptsNames<Arr>]? : (
                    AcceptsOf<FieldWithName<Arr, Extract<requiredName, string>>>|undefined
                )
            } &
            {
                [optionalName in OptionalAcceptsNames<Arr>]? : (
                    AcceptsOf<FieldWithName<Arr, Extract<optionalName, string>>>|undefined
                )
            }
        ),
        __canAccept : (
            {
                [requiredName in RequiredCanAcceptNames<Arr>]? : (
                    CanAcceptOf<FieldWithName<Arr, Extract<requiredName, string>>>|undefined
                )
            } &
            {
                [optionalName in OptionalCanAcceptNames<Arr>]? : (
                    CanAcceptOf<FieldWithName<Arr, Extract<optionalName, string>>>|undefined
                )
            }
        ),
    }
) {
    const optionalFields = fields.map(f => f.optional());
    const d = (name : string, mixed : any) : any => {
        if (!(mixed instanceof Object) || (mixed instanceof Date) || (mixed instanceof Array)) {
            throw new Error(`Expected ${name} to be an object; received ${toTypeStr(mixed)}`);
        }
        const result : any = {};
        for (let f of optionalFields) {
            result[f.name] = f.assertDelegate(`${name}.${f.name}`, mixed[f.name]);
        }
        return result;
    };
    return d as any;
}

export type ToSchemaType<RawFieldCollectionT extends RawFieldCollection> = (
    {
        [name in {
            [k in keyof RawFieldCollectionT] : (
                undefined extends TypeOf<RawFieldCollectionT[k]> ?
                    never :
                    k
            )
        }[keyof RawFieldCollectionT]]: TypeOf<RawFieldCollectionT[name]>;
    } &
    {
        [name in {
            [k in keyof RawFieldCollectionT] : (
                undefined extends TypeOf<RawFieldCollectionT[k]> ?
                    k :
                    never
            )
        }[keyof RawFieldCollectionT]]?: TypeOf<RawFieldCollectionT[name]>;
    }
);

export type ToSchemaAccepts<RawFieldCollectionT extends RawFieldCollection> = (
    {
        [name in {
            [k in keyof RawFieldCollectionT] : (
                undefined extends AcceptsOf<RawFieldCollectionT[k]> ?
                    never :
                    k
            )
        }[keyof RawFieldCollectionT]]: AcceptsOf<RawFieldCollectionT[name]>;
    } &
    {
        [name in {
            [k in keyof RawFieldCollectionT] : (
                undefined extends AcceptsOf<RawFieldCollectionT[k]> ?
                    k :
                    never
            )
        }[keyof RawFieldCollectionT]]?: AcceptsOf<RawFieldCollectionT[name]>;
    }
);
export type ToSchemaCanAccept<RawFieldCollectionT extends RawFieldCollection> = (
    {
        [name in {
            [k in keyof RawFieldCollectionT] : (
                undefined extends CanAcceptOf<RawFieldCollectionT[k]> ?
                    never :
                    k
            )
        }[keyof RawFieldCollectionT]]: CanAcceptOf<RawFieldCollectionT[name]>;
    } &
    {
        [name in {
            [k in keyof RawFieldCollectionT] : (
                undefined extends CanAcceptOf<RawFieldCollectionT[k]> ?
                    k :
                    never
            )
        }[keyof RawFieldCollectionT]]?: CanAcceptOf<RawFieldCollectionT[name]>;
    }
);

//https://github.com/Microsoft/TypeScript/issues/26207
function toSchemaImpl<
    RawFieldCollectionT extends RawFieldCollection
> (raw : RawFieldCollectionT) : (
    AssertDelegate<
        {
            [name in keyof ToSchemaType<RawFieldCollectionT>] : (
                TypeOf<RawFieldCollectionT[name]>
            )
        }
    > &
    {
        __accepts : (
            {
                [name in keyof ToSchemaAccepts<RawFieldCollectionT>] : (
                    AcceptsOf<RawFieldCollectionT[name]>
                )
            }
        ),
        __canAccept : (
            {
                [name in keyof ToSchemaCanAccept<RawFieldCollectionT>] : (
                    CanAcceptOf<RawFieldCollectionT[name]>
                )
            }
        )
    }
) {
    const fieldCollection = fields(raw);
    const fieldArray : Field<string, any>[] = [];
    for (let k in fieldCollection) {
        if (fieldCollection.hasOwnProperty(k)) {
            //HACK
            fieldArray.push((fieldCollection as any)[k]);
        }
    }
    return schema(...fieldArray) as any;
}

export const toSchema : <
    RawFieldCollectionT extends RawFieldCollection
> (raw : RawFieldCollectionT) => (
    AssertDelegate<
        {
            [name in keyof ToSchemaType<RawFieldCollectionT>] : (
                TypeOf<RawFieldCollectionT[name]>
            )
        }
    > &
    {
        __accepts : (
            {
                [name in keyof ToSchemaAccepts<RawFieldCollectionT>] : (
                    AcceptsOf<RawFieldCollectionT[name]>
                )
            }
        ),
        __canAccept : (
            {
                [name in keyof ToSchemaCanAccept<RawFieldCollectionT>] : (
                    CanAcceptOf<RawFieldCollectionT[name]>
                )
            }
        )
    }
) = toSchemaImpl;
export const toSchema2 : <
    RawFieldCollectionT extends RawFieldCollection
> (raw : RawFieldCollectionT) => (
    AssertDelegate<
        {
            [name in keyof ToSchemaType<RawFieldCollectionT>] : (
                TypeOf<RawFieldCollectionT[name]>
            )
        }
    > &
    {
        __accepts : (
            {
                [name in keyof ToSchemaAccepts<RawFieldCollectionT>] : (
                    AcceptsOf<RawFieldCollectionT[name]>
                )
            }
        ),
        __canAccept : (
            {
                [name in keyof ToSchemaCanAccept<RawFieldCollectionT>] : (
                    CanAcceptOf<RawFieldCollectionT[name]>
                )
            }
        )
    }
) = toSchemaImpl;
export const toSchema3 : <
    RawFieldCollectionT extends RawFieldCollection
> (raw : RawFieldCollectionT) => (
    AssertDelegate<
        {
            [name in keyof ToSchemaType<RawFieldCollectionT>] : (
                TypeOf<RawFieldCollectionT[name]>
            )
        }
    > &
    {
        __accepts : (
            {
                [name in keyof ToSchemaAccepts<RawFieldCollectionT>] : (
                    AcceptsOf<RawFieldCollectionT[name]>
                )
            }
        ),
        __canAccept : (
            {
                [name in keyof ToSchemaCanAccept<RawFieldCollectionT>] : (
                    CanAcceptOf<RawFieldCollectionT[name]>
                )
            }
        )
    }
) = toSchemaImpl;
export const toSchema4 : <
    RawFieldCollectionT extends RawFieldCollection
> (raw : RawFieldCollectionT) => (
    AssertDelegate<
        {
            [name in keyof ToSchemaType<RawFieldCollectionT>] : (
                TypeOf<RawFieldCollectionT[name]>
            )
        }
    > &
    {
        __accepts : (
            {
                [name in keyof ToSchemaAccepts<RawFieldCollectionT>] : (
                    AcceptsOf<RawFieldCollectionT[name]>
                )
            }
        ),
        __canAccept : (
            {
                [name in keyof ToSchemaCanAccept<RawFieldCollectionT>] : (
                    CanAcceptOf<RawFieldCollectionT[name]>
                )
            }
        )
    }
) = toSchemaImpl;

/*
Demonstration of the bug, and why toSchema() requires multiple copies
per level of nesting.

import {number} from "./assert-lib/number";

const n2 = toSchema({
    z : number()
});
const n3 = toSchema({
    z3 : number()
});
const raw = {
    nested2 : n2,
    nested3 : n3
};
const ts = toSchema(raw);
const ts2 = toSchema2(raw);
*/

function toPartialSchemaImpl<
    RawFieldCollectionT extends RawFieldCollection
> (raw : RawFieldCollectionT) : (
    AssertDelegate<
        {
            [name in keyof ToSchemaType<RawFieldCollectionT>] : (
                TypeOf<RawFieldCollectionT[name]>|undefined
            )
        }
    > &
    {
        __accepts : (
            {
                [name in keyof ToSchemaAccepts<RawFieldCollectionT>]? : (
                    AcceptsOf<RawFieldCollectionT[name]>|undefined
                )
            }
        ),
        __canAccept : (
            {
                [name in keyof ToSchemaCanAccept<RawFieldCollectionT>]? : (
                    CanAcceptOf<RawFieldCollectionT[name]>|undefined
                )
            }
        )
    }
) {
    const fieldCollection = fields(raw);
    const fieldArray : Field<string, any>[] = [];
    for (let k in fieldCollection) {
        if (fieldCollection.hasOwnProperty(k)) {
            //HACK
            fieldArray.push((fieldCollection as any)[k].optional());
        }
    }
    return schema(...fieldArray) as any;
}

export const toPartialSchema : <
    RawFieldCollectionT extends RawFieldCollection
> (raw : RawFieldCollectionT) => (
    AssertDelegate<
        {
            [name in keyof ToSchemaType<RawFieldCollectionT>] : (
                TypeOf<RawFieldCollectionT[name]>|undefined
            )
        }
    > &
    {
        __accepts : (
            {
                [name in keyof ToSchemaAccepts<RawFieldCollectionT>]? : (
                    AcceptsOf<RawFieldCollectionT[name]>|undefined
                )
            }
        ),
        __canAccept : (
            {
                [name in keyof ToSchemaCanAccept<RawFieldCollectionT>]? : (
                    CanAcceptOf<RawFieldCollectionT[name]>|undefined
                )
            }
        )
    }
) = toPartialSchemaImpl;