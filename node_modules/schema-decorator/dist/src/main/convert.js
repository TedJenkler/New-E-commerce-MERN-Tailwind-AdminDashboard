"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myUtil = require("./util");
const _ = require("underscore");
//Note, must match the prefix given by assert.ts assert<T>()
exports.REGEX_IGNORE_VARIABLE_NAMES = /(?:^____hijacked-by-schema-decorator-)|(?:^constructor$)/;
function keepVariableName(name) {
    return !exports.REGEX_IGNORE_VARIABLE_NAMES.test(name);
}
exports.keepVariableName = keepVariableName;
//Originally used Symbol but when projects
//start having different versions of this package,
//it all breaks down.
exports.IGNORE_EXTRA_VARIABLES = `____hijacked-by-schema-decorator-IGNORE_EXTRA_VARIABLES`;
//Class decorator, when this is on a class,
//toClass() will ignore extra variables on the raw object
function ignoreExtraVariables(ctor) {
    const result = class extends ctor {
    };
    //A hack to preserve the original name and also mark that it has been decorated
    Object.defineProperty(result, "name", {
        value: `@ignoreExtraVariables(${ctor.name})`,
    });
    Object.defineProperty(result, exports.IGNORE_EXTRA_VARIABLES, {
        value: true,
    });
    return result;
}
exports.ignoreExtraVariables = ignoreExtraVariables;
function toClass(name, raw, ctor) {
    if (myUtil.isInstanceOf(raw, ctor)) {
        return raw;
    }
    if (!(raw instanceof Object)) {
        throw new Error(`Cannot convert ${name} ${myUtil.toTypeStr(raw)} to ${ctor.name}`);
    }
    let result = undefined;
    try {
        result = new ctor();
    }
    catch (err) {
        throw new Error(`Could not instantiate ${ctor.name}; ${err.message}`);
    }
    const variables = myUtil.getAllVariables(result).map(i => i.name).filter(keepVariableName);
    if (variables.length > 0) {
        throw new Error(`Cannot convert ${name} to ${ctor.name}, ${ctor.name} has variables without assertions: ${variables.join(", ")}`);
    }
    const accessors = myUtil.getAllAccessors(result).map(i => i.name);
    const keys = Object.keys(raw);
    //HACK I'm not sure how symbols affect this but I don't use symbols
    const extraKeys = _.difference(keys, accessors.map(a => a.toString()));
    //UGLY HACK
    if (extraKeys.length > 0 && ctor[exports.IGNORE_EXTRA_VARIABLES] !== true && !ctor.name.startsWith("@ignoreExtraVariables(")) {
        throw new Error(`Cannot convert ${name} to ${ctor.name}, ${name} has extra keys: ${extraKeys.join(", ")}`);
    }
    try {
        for (let k of accessors) {
            result[k] = raw[k];
        }
        //HACK I'm not sure how symbols affect this but I don't use symbols
        const missingKeys = _.difference(accessors.map(a => a.toString()), keys);
        for (let k of missingKeys) {
            result[k] = undefined;
        }
    }
    catch (err) {
        const e = err;
        throw new Error(`Cannot convert ${name} to ${ctor.name}: ${e.message}`);
    }
    return result;
}
exports.toClass = toClass;
function anyToRaw(name, mixed, ignoreInstancesOf) {
    if (ignoreInstancesOf != undefined) {
        for (let ctor of ignoreInstancesOf) {
            if (myUtil.isInstanceOf(mixed, ctor)) {
                return mixed;
            }
        }
    }
    if (mixed instanceof Array) {
        const result = [];
        for (let i = 0; i < mixed.length; ++i) {
            const cur = anyToRaw(`${name}[${i}]`, mixed[i], ignoreInstancesOf);
            result.push(cur);
        }
        return result;
    }
    else if (mixed instanceof Date) {
        return new Date(mixed);
    }
    else if (mixed instanceof Object) {
        if (Object.getPrototypeOf(mixed).constructor == Object) {
            //This object is already as "raw" as we can get
            //Its values might not be, though
            const result = {
                ...mixed,
            };
            for (let k in mixed) {
                if (mixed.hasOwnProperty(k)) {
                    result[k] = anyToRaw(`${name}[${k}]`, mixed[k], ignoreInstancesOf);
                }
            }
            return result;
        }
        else {
            return toRaw(name, mixed, ignoreInstancesOf);
        }
    }
    else {
        return mixed;
    }
}
exports.anyToRaw = anyToRaw;
function toRaw(name, instance, ignoreInstancesOf) {
    if (ignoreInstancesOf != undefined) {
        for (let ctor of ignoreInstancesOf) {
            if (myUtil.isInstanceOf(instance, ctor)) {
                return instance;
            }
        }
    }
    const variables = myUtil.getAllVariables(instance).map(i => i.name).filter(keepVariableName);
    if (variables.length > 0) {
        throw new Error(`Cannot convert ${name} to raw, the class has variables without assertions: ${variables.join(", ")}`);
    }
    const accessors = myUtil.getAllAccessors(instance).map(a => a.name);
    const result = {};
    try {
        for (let k of accessors) {
            const cur = instance[k];
            result[k] = anyToRaw(`${name}[${k}]`, cur, ignoreInstancesOf);
        }
    }
    catch (err) {
        const e = err;
        throw new Error(`Cannot convert ${name} to raw: ${e.message}`);
    }
    return result;
}
exports.toRaw = toRaw;
//Given two classes, Base and Derived, toClassExact<Base>() will convert Derived to Base, if possible
function toClassExact(name, raw, ctor) {
    if (myUtil.isExactInstanceOf(raw, ctor)) {
        return raw;
    }
    else {
        //TODO find a better way to do this
        if (raw instanceof Object) {
            return toClass(name, { ...raw }, ctor);
        }
        else {
            return toClass(name, raw, ctor);
        }
    }
}
exports.toClassExact = toClassExact;
//# sourceMappingURL=convert.js.map