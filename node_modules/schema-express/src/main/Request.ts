//import * as sd from "schema-decorator";
import * as express from "express";

export interface RequestData {
    params?  : object;
    query?   : object;
    body?    : object;
    headers? : object;
}

export interface Request<DataT extends RequestData> extends express.Request {
    params  : (
        "params" extends keyof DataT ?
            DataT["params"] :
            {}
    ),
    query   : (
        "query" extends keyof DataT ?
            DataT["query"] :
            {}
    ),
    body    : (
        "body" extends keyof DataT ?
            DataT["body"] :
            {}
    ),
    headers : (
        (
            "headers" extends keyof DataT ?
                DataT["headers"] :
                {}
        ) &
        {
            [header: string]: string | (string[]) | undefined;
        }
    ),
    /*params : (
        RouteT["data"]["paramF"] extends sd.AnyAssertFunc ?
            sd.TypeOf<RouteT["data"]["paramF"]> :
            {}
    );
    query : (
        RouteT["data"]["queryF"] extends sd.AnyAssertFunc ?
            sd.TypeOf<RouteT["data"]["queryF"]> :
            {}
    );
    body : (
        RouteT["data"]["bodyF"] extends sd.AnyAssertFunc ?
            sd.TypeOf<RouteT["data"]["bodyF"]> :
            {}
    );
    headers : (
        (
            RouteT["data"]["headerF"] extends sd.AnyAssertFunc ?
                sd.TypeOf<RouteT["data"]["headerF"]> :
                {}
        ) &
        {
            [header: string]: string | (string[]) | undefined;
        }
    );*/
}