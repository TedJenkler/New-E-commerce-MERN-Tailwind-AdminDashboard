import * as express from "express";
export interface RequestData {
    params?: object;
    query?: object;
    body?: object;
    headers?: object;
}
export interface Request<DataT extends RequestData> extends express.Request {
    params: ("params" extends keyof DataT ? DataT["params"] : {});
    query: ("query" extends keyof DataT ? DataT["query"] : {});
    body: ("body" extends keyof DataT ? DataT["body"] : {});
    headers: (("headers" extends keyof DataT ? DataT["headers"] : {}) & {
        [header: string]: string | (string[]) | undefined;
    });
}
