"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = require("../assert-lib");
class Path {
    constructor(arr = [], str = "") {
        this.arr = arr;
        this.str = str;
        this._dummyParamKeys;
    }
    append(part) {
        if (part.length == 0) {
            //No change, return a copy, anyway
            return new Path([...this.arr], this.str);
        }
        if (part.indexOf(":") >= 0) {
            throw new Error(`":" not allowed in part, ${part}`);
        }
        if (part[0] != "/") {
            throw new Error(`part must start with "/", ${part}`);
        }
        if (part.length > 1 && part[part.length - 1] == "/") {
            throw new Error(`part must not end with "/", ${part}`);
        }
        const arr = this.arr.slice();
        arr.push(part);
        return new Path(arr, (this.str + part)
            .replace(/\/{2,}/g, "/")
            .replace(/\/$/g, ""));
    }
    //regex, if provided, ignores modifiers like `g` and `i`
    appendParam(param, regex) {
        if (param.indexOf(":") >= 0) {
            throw new Error(`":" not allowed in part, ${param}`);
        }
        if (param.indexOf("/") >= 0) {
            throw new Error(`"/" not allowed in part, ${param}`);
        }
        let newStr = this.str + "/:" + param;
        if (regex != null) {
            newStr += `(${regex.source})`;
        }
        const arr = this.arr.slice();
        const newParam = {
            param: param,
            regex: regex,
        };
        arr.push(newParam);
        return new Path(arr, newStr);
    }
    getRouterPath() {
        return this.str;
    }
    getCallingPath(p) {
        let result = "";
        for (let i of this.arr) {
            if (typeof i == "string") {
                result += i;
            }
            else {
                const raw = p[i.param];
                const value = raw.toString();
                if (i.regex != null) {
                    if (!new RegExp(`^${i.regex.source}$`).test(value)) {
                        throw new Error(`Invalid value for ${i.param}, received ${value}; expected /^${i.regex.source}$/`);
                    }
                }
                result += `/${encodeURIComponent(value)}`;
            }
        }
        return result.replace(/\/{2,}/g, "/");
    }
    hasParam() {
        return this.arr.some(i => (typeof i != "string"));
    }
    getParams() {
        return this.arr.filter((i) => (typeof i != "string"));
    }
}
exports.Path = Path;
;
class Route {
    constructor(_method, data) {
        this._method = _method;
        this.data = data;
    }
    static Create() {
        return new Route("Contextual", {
            path: new Path(),
        });
    }
    append(part) {
        return new Route(this._method, {
            ...this.data,
            path: this.data.path.append(part),
        });
    }
    appendParam(param, regex) {
        return new Route(this._method, {
            ...this.data,
            path: this.data.path.appendParam(param, regex),
        });
    }
    param(paramF) {
        return new Route(this._method, {
            ...this.data,
            paramF: paramF,
        });
    }
    query(queryF) {
        return new Route(this._method, {
            ...this.data,
            queryF: queryF,
        });
    }
    body(bodyF) {
        return new Route(this._method, {
            ...this.data,
            bodyF: bodyF,
        });
    }
    header(headerF) {
        return new Route(this._method, {
            ...this.data,
            headerF: headerF,
        });
    }
    response(responseF) {
        return new Route(this._method, {
            ...this.data,
            responseF: responseF,
        });
    }
    /*
        Shortcut for,
        declare const r : Route;
        const r2 = r.query(sd.intersect(
            r.data.queryF,
            someValidator
        ));
        //Use r2

        Instead,
        declare const r : Route;
        const r2 = r.intersectQuery(someValidator);
    */
    intersectQuery(queryF) {
        if (this.data.queryF == undefined) {
            return new Route(this._method, {
                ...this.data,
                queryF: queryF,
            });
        }
        else {
            return new Route(this._method, {
                ...this.data,
                queryF: a.intersect(queryF, this.data.queryF),
            });
        }
    }
    method(method) {
        return new Route(method, this.data);
    }
    getMethod() {
        if (this._method == "Contextual") {
            if (this.data.bodyF == undefined) {
                return "GET";
            }
            else {
                return "POST";
            }
        }
        else {
            return this._method;
        }
    }
    withoutParam() {
        const newData = {
            ...this.data
        };
        delete newData["paramF"];
        return new Route(this._method, newData);
    }
    //Dangerous to use unless you know what you're doing.
    //Will allow you to bypass checks for this call but there are still other
    //checks like on the class type.
    //This hack is only necessary because of,
    //https://github.com/Microsoft/TypeScript/issues/23673
    anyParam(paramF) {
        return new Route(this._method, {
            ...this.data,
            paramF: paramF,
        });
    }
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map