export declare const REGEX_IGNORE_VARIABLE_NAMES: RegExp;
export declare function keepVariableName(name: string): boolean;
export declare const IGNORE_EXTRA_VARIABLES = "____hijacked-by-schema-decorator-IGNORE_EXTRA_VARIABLES";
export declare function ignoreExtraVariables<CtorT extends {
    new (...args: any[]): {};
}>(ctor: CtorT): {
    new (...args: any[]): {};
} & CtorT;
export declare function toClass<T>(name: string, raw: any, ctor: {
    new (): T;
}): T;
export declare function anyToRaw(name: string, mixed: any, ignoreInstancesOf?: {
    new (...args: any[]): any;
}[]): any;
export declare type Raw<T> = {
    [k in keyof T]: T[k];
};
export declare function toRaw<T>(name: string, instance: T, ignoreInstancesOf?: {
    new (...args: any[]): any;
}[]): Raw<T>;
export declare function toClassExact<T>(name: string, raw: any, ctor: {
    new (): T;
}): T;
