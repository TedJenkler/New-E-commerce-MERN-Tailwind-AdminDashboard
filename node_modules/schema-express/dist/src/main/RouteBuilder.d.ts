import * as sd from "schema-decorator";
import * as expressCore from "express-serve-static-core";
import * as express from "express";
import { VoidHandler, RequestVoidHandler, ErrorVoidHandler } from "./VoidHandler";
import { Handler, RequestHandler, ErrorHandler } from "./Handler";
import { AsyncVoidHandler, AsyncRequestVoidHandler, AsyncErrorVoidHandler } from "./AsyncVoidHandler";
import { AsyncJsonHandler, AsyncRequestJsonHandler, AsyncErrorJsonHandler } from "./AsyncJsonHandler";
import { Assign } from "./assign";
import { RequestData } from "./Request";
import { ResponseData } from "./Response";
import { CanHandle } from "./CanHandle";
export declare type RouteToRequestData<RouteT extends sd.Route<any>> = ({
    params: ("paramF" extends keyof RouteT["data"] ? sd.TypeOf<RouteT["data"]["paramF"]> : {});
    query: ("queryF" extends keyof RouteT["data"] ? sd.TypeOf<RouteT["data"]["queryF"]> : {});
    body: ("bodyF" extends keyof RouteT["data"] ? sd.TypeOf<RouteT["data"]["bodyF"]> : {});
    headers: ("headerF" extends keyof RouteT["data"] ? sd.TypeOf<RouteT["data"]["headerF"]> : {});
});
export declare type RouteToResponseData<RouteT extends sd.Route<any>, LocalsT extends object> = ("responseF" extends keyof RouteT["data"] ? {
    locals: LocalsT;
    response: sd.AcceptsOf<RouteT["data"]["responseF"]>;
} : {
    locals: LocalsT;
});
export declare class RouteBuilder<RequestDataT extends RequestData, ResponseDataT extends ResponseData, RouterT extends expressCore.IRouter | undefined = undefined> {
    private route;
    private handlers;
    private rawRouter;
    readonly _dummyRequestDataT?: RequestDataT;
    readonly _dummyResponseDataT?: ResponseDataT;
    readonly _dummyRouterT?: RouterT;
    private constructor();
    static Create<RouteT extends sd.Route<any>, LocalsT extends object>(route: RouteT): (RouteBuilder<RouteToRequestData<RouteT>, RouteToResponseData<RouteT, LocalsT>, undefined>);
    voidHandler(handler: RequestVoidHandler<RequestDataT, ResponseDataT>): (RouteBuilder<RequestDataT, ResponseDataT, RouterT>);
    voidHandler(handler: ErrorVoidHandler<RequestDataT, ResponseDataT>): (RouteBuilder<RequestDataT, ResponseDataT, RouterT>);
    voidHandler(handler: VoidHandler<RequestDataT, ResponseDataT>): (RouteBuilder<RequestDataT, ResponseDataT, RouterT>);
    voidHandler<H extends VoidHandler<any, any>>(handler: H): (H extends VoidHandler<infer Req, infer Res> ? (CanHandle<Req, Res, RequestDataT, ResponseDataT> extends true ? RouteBuilder<RequestDataT, ResponseDataT, RouterT> : never) : never);
    handler<NxtL extends object>(handler: RequestHandler<RequestDataT, ResponseDataT, NxtL>): (RouteBuilder<RequestDataT, {
        [key in keyof ResponseDataT]: (key extends "locals" ? Assign<ResponseDataT["locals"], NxtL> : ResponseDataT[key]);
    }, RouterT>);
    handler<NxtL extends object>(handler: ErrorHandler<RequestDataT, ResponseDataT, NxtL>): (RouteBuilder<RequestDataT, {
        [key in keyof ResponseDataT]: (key extends "locals" ? Assign<ResponseDataT["locals"], NxtL> : ResponseDataT[key]);
    }, RouterT>);
    handler<H extends Handler<any, any, any>>(handler: H): (H extends Handler<infer Req, infer Res, infer NxtL> ? (CanHandle<Req, Res, RequestDataT, ResponseDataT> extends true ? RouteBuilder<RequestDataT, {
        [key in keyof ResponseDataT]: (key extends "locals" ? Assign<ResponseDataT["locals"], NxtL> : ResponseDataT[key]);
    }, RouterT> : never) : never);
    asyncVoidHandler(handler: AsyncRequestVoidHandler<RequestDataT, ResponseDataT>): (RouteBuilder<RequestDataT, ResponseDataT, RouterT>);
    asyncVoidHandler(handler: AsyncErrorVoidHandler<RequestDataT, ResponseDataT>): (RouteBuilder<RequestDataT, ResponseDataT, RouterT>);
    asyncVoidHandler(handler: AsyncVoidHandler<RequestDataT, ResponseDataT>): (RouteBuilder<RequestDataT, ResponseDataT, RouterT>);
    asyncVoidHandler<H extends AsyncVoidHandler<any, any>>(handler: H): (H extends AsyncVoidHandler<infer Req, infer Res> ? (CanHandle<Req, Res, RequestDataT, ResponseDataT> extends true ? RouteBuilder<RequestDataT, ResponseDataT, RouterT> : never) : never);
    asyncJsonHandler(handler: AsyncRequestJsonHandler<RequestDataT, ResponseDataT>): (RouteBuilder<RequestDataT, ResponseDataT, RouterT>);
    asyncJsonHandler(handler: AsyncErrorJsonHandler<RequestDataT, ResponseDataT>): (RouteBuilder<RequestDataT, ResponseDataT, RouterT>);
    asyncJsonHandler(handler: AsyncJsonHandler<RequestDataT, ResponseDataT>): (RouteBuilder<RequestDataT, ResponseDataT, RouterT>);
    asyncJsonHandler<H extends AsyncJsonHandler<any, any>>(handler: H): (H extends AsyncJsonHandler<infer Req, infer Res> ? (CanHandle<Req, Res, RequestDataT, ResponseDataT> extends true ? RouteBuilder<RequestDataT, ResponseDataT, RouterT> : never) : never);
    static GetRouterMatcher(router: expressCore.IRouter, method: Exclude<sd.MethodLiteral, "Contextual">): express.IRouterMatcher<expressCore.IRouter>;
    setRouter(rawRouter: expressCore.IRouter): RouteBuilder<RequestDataT, ResponseDataT, expressCore.IRouter>;
    build(this: RouteBuilder<RequestDataT, ResponseDataT, expressCore.IRouter>): void;
}
