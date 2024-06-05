export interface AccessorDescriptor {
    configurable: boolean;
    enumerable: boolean;
    get: undefined | (() => any);
    set: undefined | ((v: any) => void);
}
export interface AccessorItem<T extends Object> {
    name: keyof T;
    descriptor: AccessorDescriptor;
}
export declare function isAccessorDescriptor(descriptor: PropertyDescriptor | null | undefined): descriptor is AccessorDescriptor;
export declare function getOwnAccessors<T extends Object>(obj: T): AccessorItem<T>[];
export declare function getAllAccessors<T extends Object>(obj: T): AccessorItem<T>[];
export declare function getAccessor(obj: Object, name: PropertyKey): AccessorDescriptor | undefined;
export interface VariableDescriptor {
    configurable: boolean;
    enumerable: boolean;
    value: any;
    writable: boolean;
}
export interface VariableItem {
    name: string;
    descriptor: VariableDescriptor;
}
export declare function isVariableDescriptor(descriptor: PropertyDescriptor | null | undefined): descriptor is VariableDescriptor;
export declare function getOwnVariables(obj: Object): VariableItem[];
export declare function getAllVariables(obj: Object): VariableItem[];
export declare function isExactInstanceOf<T>(mixed: any, ctor: {
    new (...args: any[]): T;
}): mixed is T;
export declare function toTypeStr(mixed: unknown): string;
export declare function allowsInstanceOf(ctor: any): boolean;
export declare function isInstanceOf<T>(raw: any, ctor: new (...args: any[]) => T): raw is T;
