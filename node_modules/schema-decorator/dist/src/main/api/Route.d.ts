import { AnyAssertFunc, ChainedAssertFunc, Chainable, TypeOf } from "../types";
import { Param, AnyParam } from "./Param";
import * as a from "../assert-lib";
export interface PathParam<ParamKeys extends string> {
    param: ParamKeys;
    regex?: RegExp;
}
export declare class Path<ParamKeys extends string> {
    private arr;
    private readonly str;
    readonly _dummyParamKeys?: ParamKeys;
    constructor(arr?: (string | PathParam<ParamKeys>)[], str?: string);
    append(part: string): Path<ParamKeys>;
    appendParam<P extends string>(param: P, regex?: RegExp): Path<ParamKeys | P>;
    getRouterPath(): string;
    getCallingPath(p: AnyParam<ParamKeys>): string;
    hasParam(): boolean;
    getParams(): PathParam<ParamKeys>[];
}
export declare type MethodLiteral = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "Contextual";
export interface RouteData {
    readonly path: Path<string>;
    readonly paramF?: undefined | ChainedAssertFunc<any>;
    readonly queryF?: undefined | AnyAssertFunc;
    readonly bodyF?: undefined | AnyAssertFunc;
    readonly headerF?: undefined | AnyAssertFunc;
    readonly responseF?: undefined | AnyAssertFunc;
}
export interface IRoute<DataT extends RouteData> {
    readonly data: DataT;
    getMethod(): Exclude<MethodLiteral, "Contextual">;
}
export declare class Route<DataT extends RouteData> implements IRoute<DataT> {
    private readonly _method;
    readonly data: DataT;
    static Create(): Route<{
        path: Path<never>;
    }>;
    private constructor();
    append(part: string): Route<DataT>;
    appendParam<P extends string>(this: (DataT["paramF"] extends ChainedAssertFunc<any> ? never : any), param: P, regex?: RegExp): (Route<{
        [key in keyof DataT]: (key extends "path" ? Path<Extract<DataT["path"]["_dummyParamKeys"] | P, string>> : DataT[key]);
    }>);
    param<P extends ChainedAssertFunc<Param<Extract<DataT["path"]["_dummyParamKeys"], string>>>>(this: (DataT["paramF"] extends ChainedAssertFunc<any> ? never : Route<DataT>), paramF: P): (Chainable<Param<Extract<DataT["path"]["_dummyParamKeys"], string>>, P> extends true ? (TypeOf<P> extends AnyParam<Extract<DataT["path"]["_dummyParamKeys"], string>> ? Route<{
        [key in keyof DataT]: (key extends "paramF" ? P : DataT[key]);
    } & {
        paramF: P;
    }> : never) : never);
    query<Q extends AnyAssertFunc>(queryF: Q): (Route<{
        [key in keyof DataT]: (key extends "queryF" ? Q : DataT[key]);
    } & {
        queryF: Q;
    }>);
    body<B extends AnyAssertFunc>(bodyF: B): (Route<{
        [key in keyof DataT]: (key extends "bodyF" ? B : DataT[key]);
    } & {
        bodyF: B;
    }>);
    header<H extends AnyAssertFunc>(headerF: H): (Route<{
        [key in keyof DataT]: (key extends "headerF" ? H : DataT[key]);
    } & {
        headerF: H;
    }>);
    response<R extends AnyAssertFunc>(responseF: R): (Route<{
        [key in keyof DataT]: (key extends "responseF" ? R : DataT[key]);
    } & {
        responseF: R;
    }>);
    intersectQuery<Q extends AnyAssertFunc>(queryF: Q): ("queryF" extends keyof DataT ? Route<{
        [key in keyof DataT]: (key extends "queryF" ? (DataT["queryF"] extends AnyAssertFunc ? a.IntersectAssertDelegate<[Q, Exclude<DataT["queryF"], undefined>]> : Q) : DataT[key]);
    }> : Route<DataT & {
        queryF: Q;
    }>);
    method(method: MethodLiteral): (Route<DataT>);
    getMethod(): "GET" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT" | "PATCH" | "CONNECT";
    withoutParam(): (Route<{
        [key in Exclude<(keyof DataT) | (keyof RouteData), "paramF">]: (key extends keyof DataT ? DataT[key] : never);
    }>);
    anyParam<P extends ChainedAssertFunc<any>>(this: (DataT extends {
        paramF: ChainedAssertFunc<any>;
    } ? never : Route<DataT>), paramF: P): (Route<{
        [key in keyof DataT]: (key extends "paramF" ? P : DataT[key]);
    } & {
        paramF: P;
    }>);
}
