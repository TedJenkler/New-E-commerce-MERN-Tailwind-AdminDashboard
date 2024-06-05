import {AnyAssertFunc, ChainedAssertFunc, Chainable, TypeOf} from "../types";
import {Param, AnyParam} from "./Param";
import * as a from "../assert-lib";

export interface PathParam<ParamKeys extends string> {
    param  : ParamKeys,
    regex? : RegExp,
}
export class Path<ParamKeys extends string> {
    private arr : (string|PathParam<ParamKeys>)[];
    private readonly str : string;
    public readonly _dummyParamKeys? : ParamKeys;
    public constructor (arr : (string|PathParam<ParamKeys>)[] = [], str : string = "") {
        this.arr = arr;
        this.str = str;
        this._dummyParamKeys;
    }

    public append (part : string) : Path<ParamKeys> {
        if (part.length == 0) {
            //No change, return a copy, anyway
            return new Path(
                [...this.arr],
                this.str
            );
        }
        if (part.indexOf(":") >= 0) {
            throw new Error(`":" not allowed in part, ${part}`);
        }
        if (part[0] != "/") {
            throw new Error(`part must start with "/", ${part}`);
        }
        if (part.length > 1 && part[part.length-1] == "/") {
            throw new Error(`part must not end with "/", ${part}`);
        }

        const arr = this.arr.slice();
        arr.push(part);
        return new Path(
            arr,
            (this.str + part)
                .replace(/\/{2,}/g, "/")
                .replace(/\/$/g, "")
        );
    }
    //regex, if provided, ignores modifiers like `g` and `i`
    public appendParam<P extends string> (param : P, regex? : RegExp) : Path<ParamKeys|P> {
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
        const arr : (string|PathParam<ParamKeys|P>)[] = this.arr.slice();
        const newParam : PathParam<P> = {
            param : param,
            regex : regex,
        };
        arr.push(newParam);
        return new Path<ParamKeys|P>(
            arr,
            newStr
        );
    }
    public getRouterPath () : string {
        return this.str;
    }
    public getCallingPath (p : AnyParam<ParamKeys>) : string {
        let result = "";
        for (let i of this.arr) {
            if (typeof i == "string") {
                result += i;
            } else {
                const raw : any = p[i.param];
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
    public hasParam () {
        return this.arr.some(i => (typeof i != "string"));
    }
    public getParams () : PathParam<ParamKeys>[] {
        return this.arr.filter((i) : i is PathParam<ParamKeys> => (typeof i != "string"));
    }
}

export type MethodLiteral = "GET"|"POST"|"PUT"|"DELETE"|"PATCH"|"HEAD"|"OPTIONS"|"CONNECT"|"Contextual";

export interface RouteData {
    readonly path : Path<string>,
    readonly paramF? : undefined|ChainedAssertFunc<any>,
    readonly queryF? : undefined|AnyAssertFunc,
    readonly bodyF?  : undefined|AnyAssertFunc,
    readonly headerF?  : undefined|AnyAssertFunc,
    readonly responseF? : undefined|AnyAssertFunc,
};
export interface IRoute<DataT extends RouteData> {
    readonly data : DataT;
    getMethod () : Exclude<MethodLiteral, "Contextual">;
}
export class Route<DataT extends RouteData> implements IRoute<DataT> {
    public static Create () : Route<{
        path : Path<never>,
    }> {
        return new Route(
            "Contextual",
            {
                path : new Path<never>(),
            }
        );
    }

    private constructor (
        private readonly _method : MethodLiteral,
        public readonly data : DataT
    ) {
    }

    public append (part : string) : Route<DataT> {
        return new Route(
            this._method,
            {
                ...(this.data as any),
                path : this.data.path.append(part),
            }
        );
    }
    public appendParam<P extends string> (
        this : (
            DataT["paramF"] extends ChainedAssertFunc<any> ?
                never :
                any
        ),
        param : P,
        regex? : RegExp
    ) : (
        Route<{
            [key in keyof DataT] : (
                key extends "path" ?
                Path<Extract<DataT["path"]["_dummyParamKeys"]|P, string>> :
                DataT[key]
            )
        }>
    ) {
        return new Route(
            (this as this)._method,
            {
                ...((this as this).data as any),
                path : (this as this).data.path.appendParam(param, regex),
            }
        );
    }
    public param<
        P extends ChainedAssertFunc<
            Param<Extract<
                DataT["path"]["_dummyParamKeys"],
                string
            >>
        >
    > (
        this : (
            DataT["paramF"] extends ChainedAssertFunc<any> ?
                never :
                Route<DataT>
        ),
        paramF : P
    ) : (
        Chainable<
            Param<Extract<
                DataT["path"]["_dummyParamKeys"],
                string
            >>,
            P
        > extends true ?
            (
                TypeOf<P> extends AnyParam<Extract<
                    DataT["path"]["_dummyParamKeys"],
                    string
                >> ?
                    Route<
                        {
                            [key in keyof DataT] : (
                                key extends "paramF" ?
                                P :
                                DataT[key]
                            )
                        } &
                        { paramF : P }
                    > :
                    never
            ) :
            never
    ) {
        return new Route(
            this._method,
            {
                ...(this.data as any),
                paramF : paramF,
            }
        ) as any;
    }
    public query<Q extends AnyAssertFunc> (queryF : Q) : (
        Route<
            {
                [key in keyof DataT] : (
                    key extends "queryF" ?
                    Q :
                    DataT[key]
                )
            } &
            { queryF : Q }
        >
    ) {
        return new Route(
            this._method,
            {
                ...(this.data as any),
                queryF : queryF,
            }
        );
    }
    public body<B extends AnyAssertFunc> (bodyF : B) : (
        Route<
            {
                [key in keyof DataT] : (
                    key extends "bodyF" ?
                    B :
                    DataT[key]
                )
            } &
            { bodyF : B }
        >
    ) {
        return new Route(
            this._method,
            {
                ...(this.data as any),
                bodyF : bodyF,
            }
        );
    }
    public header<H extends AnyAssertFunc> (headerF : H) : (
        Route<
            {
                [key in keyof DataT] : (
                    key extends "headerF" ?
                    H :
                    DataT[key]
                )
            } &
            { headerF : H }
        >
    ) {
        return new Route(
            this._method,
            {
                ...(this.data as any),
                headerF : headerF,
            }
        );
    }
    public response<R extends AnyAssertFunc> (responseF : R) : (
        Route<
            {
                [key in keyof DataT] : (
                    key extends "responseF" ?
                    R :
                    DataT[key]
                )
            } &
            { responseF : R }
        >
    ) {
        return new Route(
            this._method,
            {
                ...(this.data as any),
                responseF : responseF,
            }
        );
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
    intersectQuery<Q extends AnyAssertFunc> (queryF : Q) : (
        "queryF" extends keyof DataT ?
            Route<
                {
                    [key in keyof DataT] : (
                        key extends "queryF" ?
                        (
                            DataT["queryF"] extends AnyAssertFunc ?
                                a.IntersectAssertDelegate<[Q, Exclude<DataT["queryF"], undefined>]> :
                                Q
                        ) :
                        DataT[key]
                    )
                }
            > :
            Route<
                DataT &
                { queryF : Q }
            >
    ) {
        if (this.data.queryF == undefined) {
            return new Route(
                this._method,
                {
                    ...(this.data as any),
                    queryF : queryF,
                }
            ) as any;
        } else {
            return new Route(
                this._method,
                {
                    ...(this.data as any),
                    queryF : a.intersect(
                        queryF,
                        this.data.queryF
                    ),
                }
            ) as any;
        }
    }

    public method (method : MethodLiteral) : (
        Route<DataT>
    ) {
        return new Route(
            method,
            this.data
        );
    }
    public getMethod () {
        if (this._method == "Contextual") {
            if (this.data.bodyF == undefined) {
                return "GET";
            } else {
                return "POST";
            }
        } else {
            return this._method;
        }
    }

    public withoutParam () : (
        Route<{
            [key in Exclude<(keyof DataT)|(keyof RouteData), "paramF">] : (
                key extends keyof DataT ?
                    DataT[key] :
                    never
            )
        }>
    ) {
        const newData = {
            ...(this.data as any)
        };
        delete newData["paramF"];
        return new Route(
            this._method,
            newData
        );
    }

    //Dangerous to use unless you know what you're doing.
    //Will allow you to bypass checks for this call but there are still other
    //checks like on the class type.
    //This hack is only necessary because of,
    //https://github.com/Microsoft/TypeScript/issues/23673
    public anyParam<
        P extends ChainedAssertFunc<any>
    > (
        this : (
            DataT extends { paramF : ChainedAssertFunc<any> } ?
                never :
                Route<DataT>
        ),
        paramF : P
    ) : (
        Route<
            {
                [key in keyof DataT] : (
                    key extends "paramF" ?
                    P :
                    DataT[key]
                )
            } &
            { paramF : P }
        >
    ) {
        return new Route(
            this._method,
            {
                ...(this.data as any),
                paramF : paramF,
            }
        );
    }
}