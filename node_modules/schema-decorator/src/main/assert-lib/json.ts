import {AssertDelegate} from "../types";
import {or, chain} from "./operator";
import {string} from "./basic";
import {toTypeStr} from "../util";

export function jsonObjectStr () {
    return chain(
        string(),
        (name : string, str : string) : string => {
            let jsonObject : Object|undefined = undefined;
            try {
                jsonObject = JSON.parse(str);
            } catch (err) {
                throw new Error(`Expected ${name} to be a valid JSON string; ${err.message}`);
            }
            const jsonStr = JSON.stringify(jsonObject);
            if (jsonStr[0] != "{") {
                throw new Error(`Expected ${name} to be a JSON object`);
            }
            //We return the result of JSON.stringify() to use the minimal amount of space
            return jsonStr;
        }
    );
}
export function jsonObjectToString () : (
    AssertDelegate<string> &
    {
        __accepts : { [k : string] : any }
    }
) {
    return ((name : string, mixed : unknown) => {
        if (!(mixed instanceof Object) || (mixed instanceof Date) || (mixed instanceof Array) || (mixed instanceof Function)) {
            throw new Error(`${name} is not a valid JSON object; expected an object; received ${toTypeStr(mixed)}`);
        }
        try {
            return JSON.stringify(mixed);
        } catch (err) {
            throw new Error(`${name} is not a valid JSON object; ${err.message}`);
        }
    }) as any;
}
export function jsonStringToObject () {
    return (name : string, str : string) : { [k : string] : any } => {
        if (typeof str != "string") {
            throw new Error(`Expected ${name} to be of type string; received ${toTypeStr(str)}`);
        }
        try {
            const result = JSON.parse(str);
            if (!(result instanceof Object) || (result instanceof Date) || (result instanceof Array) || (result instanceof Function)) {
                throw new Error(`${name} to represent a valid JSON object; expected an object; received ${toTypeStr(result)}`);
            }
            return result;
        } catch (err) {
            throw new Error(`${name} is not a valid JSON string; ${err.message}`);
        }
    };
}
export function jsonObject () {
    return or(
        chain(
            jsonObjectStr(),
            jsonStringToObject()
        ),
        chain(
            jsonObjectToString(),
            jsonObjectStr(),
            jsonStringToObject()
        )
    );
}