export interface AccessorDescriptor {
    configurable : boolean;
    enumerable : boolean;
    get : undefined|(() => any);
    set : undefined|((v: any) => void);
}
export interface AccessorItem<T extends Object> {
    name : keyof T,
    descriptor : AccessorDescriptor,
}

export function isAccessorDescriptor (descriptor : PropertyDescriptor|null|undefined) : descriptor is AccessorDescriptor {
    if (descriptor == null) {
        return false;
    }
    return (
        descriptor.hasOwnProperty("get") &&
        descriptor.hasOwnProperty("set") &&
        descriptor.hasOwnProperty("configurable") &&
        descriptor.hasOwnProperty("enumerable") &&
        (
            typeof descriptor.get == "function" ||
            typeof descriptor.get == "undefined"
        ) &&
        (
            typeof descriptor.set == "function" ||
            typeof descriptor.set == "undefined"
        ) &&
        typeof descriptor.configurable == "boolean" &&
        typeof descriptor.enumerable == "boolean"
    );
}
const BUILT_IN_PROTOTYPES = [
    Object.prototype,
    Date.prototype,
];
function isBuiltInPrototype (obj : Object) {
    return BUILT_IN_PROTOTYPES.indexOf(obj) >= 0;
}
export function getOwnAccessors<T extends Object> (obj : T) {
    const arr : (keyof T)[] = Object.getOwnPropertyNames(obj) as any;
    const result : AccessorItem<T>[] = [];
    for (let k of arr) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, k);
        if (isAccessorDescriptor(descriptor)) {
            result.push({
                name : k,
                descriptor : descriptor,
            });
        }
    }
    return result;
}

export function getAllAccessors<T extends Object> (obj : T) {
    const result : AccessorItem<T>[] = [];
    while (!isBuiltInPrototype(obj)) {
        result.push(...getOwnAccessors(obj));
        obj = Object.getPrototypeOf(obj);
    }
    return result;
}

export function getAccessor (obj : Object, name : PropertyKey) : AccessorDescriptor|undefined {
    if (isBuiltInPrototype(obj)) {
        return undefined;
    }
    const potentialResult = Object.getOwnPropertyDescriptor(obj, name);
    if (potentialResult == undefined || !isAccessorDescriptor(potentialResult)) {
        return getAccessor(Object.getPrototypeOf(obj), name);
    }
    return potentialResult;
}

export interface VariableDescriptor {
    configurable : boolean;
    enumerable : boolean;
    value : any,
    writable : boolean,
}
export interface VariableItem {
    name : string,
    descriptor : VariableDescriptor,
}
export function isVariableDescriptor (descriptor : PropertyDescriptor|null|undefined) : descriptor is VariableDescriptor {
    if (descriptor == null) {
        return false;
    }
    return (
        descriptor.hasOwnProperty("value") &&
        descriptor.hasOwnProperty("writable") &&
        descriptor.hasOwnProperty("configurable") &&
        descriptor.hasOwnProperty("enumerable") &&
        typeof descriptor.writable == "boolean" &&
        typeof descriptor.configurable == "boolean" &&
        typeof descriptor.enumerable == "boolean"
    );
}

export function getOwnVariables (obj : Object) {
    const arr = Object.getOwnPropertyNames(obj);
    const result : VariableItem[] = [];
    for (let k of arr) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, k);
        if (isVariableDescriptor(descriptor)) {
            result.push({
                name : k,
                descriptor : descriptor,
            });
        }
    }
    return result;
}

export function getAllVariables (obj : Object) {
    const result : VariableItem[] = [];
    while (!isBuiltInPrototype(obj)) {
        result.push(...getOwnVariables(obj));
        obj = Object.getPrototypeOf(obj);
    }
    return result;
}

export function isExactInstanceOf<T> (mixed : any, ctor : {new(...args:any[]):T}) : mixed is T {
    if (mixed == undefined) {
        return false;
    }
    if (!(mixed instanceof Object)) {
        return false;
    }
    return (Object.getPrototypeOf(mixed).constructor == ctor);
}

export function toTypeStr (mixed : unknown) : string {
    if (mixed === null) {
        return "null";
    }
    if (mixed === undefined) {
        return "undefined"
    }
    const str = (typeof mixed);
    if (str !== "object") {
        return str;
    }
    const prototype = Object.getPrototypeOf(mixed);
    if (prototype == undefined) {
        return "[Unknown Type]";
    }
    const constructor = prototype.constructor;
    if (constructor == undefined) {
        return "[Unknown Prototype]";
    }
    const name = constructor.name;
    if (typeof name === "string") {
        return name;
    }
    return "[Unknown Name]";
}

export function allowsInstanceOf (ctor : any) : boolean {
    try {
        ({} instanceof ctor);
        return true;
    } catch (e) {
        // any of the property accesses threw
        return false;
    }
}
export function isInstanceOf<T> (raw : any, ctor : new (...args : any[]) => T) : raw is T {
    if (!allowsInstanceOf(ctor)) {
        throw new Error(`instanceof check not allowed on ${ctor.name}`);
    }
    try {
        return (raw instanceof ctor)
    } catch (_err) {
        throw new Error(`${ctor.name} is not a constructor`);
    }
}