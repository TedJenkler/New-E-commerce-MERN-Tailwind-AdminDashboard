import { AnyField, AssertDelegate, TypeOf, AcceptsOf, CanAcceptOf } from "./types";
import { RawFieldCollection } from "./field";
import { Merge } from "./Merge";
export declare type OptionalTypeNames<Arr extends AnyField[]> = (Extract<{
    [index in Exclude<keyof Arr, keyof any[]>]: (Arr[index] extends AnyField ? (undefined extends TypeOf<Arr[index]> ? Arr[index]["name"] : never) : never);
}[Exclude<keyof Arr, keyof any[]>], string>);
export declare type RequiredTypeNames<Arr extends AnyField[]> = (Extract<{
    [index in Exclude<keyof Arr, keyof any[]>]: (Arr[index] extends AnyField ? (undefined extends TypeOf<Arr[index]> ? never : Arr[index]["name"]) : never);
}[Exclude<keyof Arr, keyof any[]>], string>);
export declare type OptionalAcceptsNames<Arr extends AnyField[]> = (Extract<{
    [index in Exclude<keyof Arr, keyof any[]>]: (Arr[index] extends AnyField ? (undefined extends AcceptsOf<Arr[index]> ? Arr[index]["name"] : never) : never);
}[Exclude<keyof Arr, keyof any[]>], string>);
export declare type RequiredAcceptsNames<Arr extends AnyField[]> = (Extract<{
    [index in Exclude<keyof Arr, keyof any[]>]: (Arr[index] extends AnyField ? (undefined extends AcceptsOf<Arr[index]> ? never : Arr[index]["name"]) : never);
}[Exclude<keyof Arr, keyof any[]>], string>);
export declare type OptionalCanAcceptNames<Arr extends AnyField[]> = (Extract<{
    [index in Exclude<keyof Arr, keyof any[]>]: (Arr[index] extends AnyField ? (undefined extends CanAcceptOf<Arr[index]> ? Arr[index]["name"] : never) : never);
}[Exclude<keyof Arr, keyof any[]>], string>);
export declare type RequiredCanAcceptNames<Arr extends AnyField[]> = (Extract<{
    [index in Exclude<keyof Arr, keyof any[]>]: (Arr[index] extends AnyField ? (undefined extends CanAcceptOf<Arr[index]> ? never : Arr[index]["name"]) : never);
}[Exclude<keyof Arr, keyof any[]>], string>);
export declare type FieldWithName<Arr extends AnyField[], NameT extends string> = ({
    [index in Exclude<keyof Arr, keyof any[]>]: (Arr[index] extends AnyField ? (Arr[index]["name"] extends NameT ? Arr[index] : never) : never);
}[Exclude<keyof Arr, keyof any[]>]);
export declare type SchemaType<Arr extends AnyField[]> = ({
    [requiredName in RequiredTypeNames<Arr>]: (TypeOf<FieldWithName<Arr, Extract<requiredName, string>>>);
} & {
    [optionalName in OptionalTypeNames<Arr>]?: (TypeOf<FieldWithName<Arr, Extract<optionalName, string>>>);
});
export declare type SchemaAccepts<Arr extends AnyField[]> = ({
    [requiredName in RequiredAcceptsNames<Arr>]: (AcceptsOf<FieldWithName<Arr, Extract<requiredName, string>>>);
} & {
    [optionalName in OptionalAcceptsNames<Arr>]?: (AcceptsOf<FieldWithName<Arr, Extract<optionalName, string>>>);
});
export declare type SchemaCanAccept<Arr extends AnyField[]> = ({
    [requiredName in RequiredCanAcceptNames<Arr>]: (CanAcceptOf<FieldWithName<Arr, Extract<requiredName, string>>>);
} & {
    [optionalName in OptionalCanAcceptNames<Arr>]?: (CanAcceptOf<FieldWithName<Arr, Extract<optionalName, string>>>);
});
export declare function schema<Arr extends AnyField[]>(...fields: Arr): (AssertDelegate<Merge<SchemaType<Arr>>> & {
    __accepts: Merge<SchemaAccepts<Arr>>;
    __canAccept: Merge<SchemaCanAccept<Arr>>;
});
export declare function partialSchema<Arr extends AnyField[]>(...fields: Arr): (AssertDelegate<{
    [requiredName in RequiredTypeNames<Arr>]: (TypeOf<FieldWithName<Arr, Extract<requiredName, string>>> | undefined);
} & {
    [optionalName in OptionalTypeNames<Arr>]: (TypeOf<FieldWithName<Arr, Extract<optionalName, string>>> | undefined);
}> & {
    __accepts: ({
        [requiredName in RequiredAcceptsNames<Arr>]?: (AcceptsOf<FieldWithName<Arr, Extract<requiredName, string>>> | undefined);
    } & {
        [optionalName in OptionalAcceptsNames<Arr>]?: (AcceptsOf<FieldWithName<Arr, Extract<optionalName, string>>> | undefined);
    });
    __canAccept: ({
        [requiredName in RequiredCanAcceptNames<Arr>]?: (CanAcceptOf<FieldWithName<Arr, Extract<requiredName, string>>> | undefined);
    } & {
        [optionalName in OptionalCanAcceptNames<Arr>]?: (CanAcceptOf<FieldWithName<Arr, Extract<optionalName, string>>> | undefined);
    });
});
export declare type ToSchemaType<RawFieldCollectionT extends RawFieldCollection> = ({
    [name in {
        [k in keyof RawFieldCollectionT]: (undefined extends TypeOf<RawFieldCollectionT[k]> ? never : k);
    }[keyof RawFieldCollectionT]]: TypeOf<RawFieldCollectionT[name]>;
} & {
    [name in {
        [k in keyof RawFieldCollectionT]: (undefined extends TypeOf<RawFieldCollectionT[k]> ? k : never);
    }[keyof RawFieldCollectionT]]?: TypeOf<RawFieldCollectionT[name]>;
});
export declare type ToSchemaAccepts<RawFieldCollectionT extends RawFieldCollection> = ({
    [name in {
        [k in keyof RawFieldCollectionT]: (undefined extends AcceptsOf<RawFieldCollectionT[k]> ? never : k);
    }[keyof RawFieldCollectionT]]: AcceptsOf<RawFieldCollectionT[name]>;
} & {
    [name in {
        [k in keyof RawFieldCollectionT]: (undefined extends AcceptsOf<RawFieldCollectionT[k]> ? k : never);
    }[keyof RawFieldCollectionT]]?: AcceptsOf<RawFieldCollectionT[name]>;
});
export declare type ToSchemaCanAccept<RawFieldCollectionT extends RawFieldCollection> = ({
    [name in {
        [k in keyof RawFieldCollectionT]: (undefined extends CanAcceptOf<RawFieldCollectionT[k]> ? never : k);
    }[keyof RawFieldCollectionT]]: CanAcceptOf<RawFieldCollectionT[name]>;
} & {
    [name in {
        [k in keyof RawFieldCollectionT]: (undefined extends CanAcceptOf<RawFieldCollectionT[k]> ? k : never);
    }[keyof RawFieldCollectionT]]?: CanAcceptOf<RawFieldCollectionT[name]>;
});
export declare const toSchema: <RawFieldCollectionT extends RawFieldCollection>(raw: RawFieldCollectionT) => (AssertDelegate<{
    [name in keyof ToSchemaType<RawFieldCollectionT>]: (TypeOf<RawFieldCollectionT[name]>);
}> & {
    __accepts: ({
        [name in keyof ToSchemaAccepts<RawFieldCollectionT>]: (AcceptsOf<RawFieldCollectionT[name]>);
    });
    __canAccept: ({
        [name in keyof ToSchemaCanAccept<RawFieldCollectionT>]: (CanAcceptOf<RawFieldCollectionT[name]>);
    });
});
export declare const toSchema2: <RawFieldCollectionT extends RawFieldCollection>(raw: RawFieldCollectionT) => (AssertDelegate<{
    [name in keyof ToSchemaType<RawFieldCollectionT>]: (TypeOf<RawFieldCollectionT[name]>);
}> & {
    __accepts: ({
        [name in keyof ToSchemaAccepts<RawFieldCollectionT>]: (AcceptsOf<RawFieldCollectionT[name]>);
    });
    __canAccept: ({
        [name in keyof ToSchemaCanAccept<RawFieldCollectionT>]: (CanAcceptOf<RawFieldCollectionT[name]>);
    });
});
export declare const toSchema3: <RawFieldCollectionT extends RawFieldCollection>(raw: RawFieldCollectionT) => (AssertDelegate<{
    [name in keyof ToSchemaType<RawFieldCollectionT>]: (TypeOf<RawFieldCollectionT[name]>);
}> & {
    __accepts: ({
        [name in keyof ToSchemaAccepts<RawFieldCollectionT>]: (AcceptsOf<RawFieldCollectionT[name]>);
    });
    __canAccept: ({
        [name in keyof ToSchemaCanAccept<RawFieldCollectionT>]: (CanAcceptOf<RawFieldCollectionT[name]>);
    });
});
export declare const toSchema4: <RawFieldCollectionT extends RawFieldCollection>(raw: RawFieldCollectionT) => (AssertDelegate<{
    [name in keyof ToSchemaType<RawFieldCollectionT>]: (TypeOf<RawFieldCollectionT[name]>);
}> & {
    __accepts: ({
        [name in keyof ToSchemaAccepts<RawFieldCollectionT>]: (AcceptsOf<RawFieldCollectionT[name]>);
    });
    __canAccept: ({
        [name in keyof ToSchemaCanAccept<RawFieldCollectionT>]: (CanAcceptOf<RawFieldCollectionT[name]>);
    });
});
export declare const toPartialSchema: <RawFieldCollectionT extends RawFieldCollection>(raw: RawFieldCollectionT) => (AssertDelegate<{
    [name in keyof ToSchemaType<RawFieldCollectionT>]: (TypeOf<RawFieldCollectionT[name]> | undefined);
}> & {
    __accepts: ({
        [name in keyof ToSchemaAccepts<RawFieldCollectionT>]?: (AcceptsOf<RawFieldCollectionT[name]> | undefined);
    });
    __canAccept: ({
        [name in keyof ToSchemaCanAccept<RawFieldCollectionT>]?: (CanAcceptOf<RawFieldCollectionT[name]> | undefined);
    });
});
