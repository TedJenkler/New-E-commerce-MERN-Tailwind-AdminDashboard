import * as sd from "schema-decorator";
import * as expressCore from "express-serve-static-core";
import * as express from "express";
import {HandlerArray} from "./HandlerArray";
import {VoidHandler, RequestVoidHandler, ErrorVoidHandler} from "./VoidHandler";
import {Handler, RequestHandler, ErrorHandler, wrapHandler} from "./Handler";
import {AsyncVoidHandler, AsyncRequestVoidHandler, AsyncErrorVoidHandler, wrapAsyncVoidHandler} from "./AsyncVoidHandler";
import {AsyncJsonHandler, AsyncRequestJsonHandler, AsyncErrorJsonHandler, wrapAsyncJsonHandler} from "./AsyncJsonHandler";
import {SchemaHandler} from "./SchemaHandler";
//import {DefaultLocalsT} from "./DefaultLocalsT";
import {wrapResponseHandler} from "./ResponseHandler";
import {Assign} from "./assign";
import {RequestData} from "./Request";
import {ResponseData} from "./Response";
import {CanHandle} from "./CanHandle";

export type RouteToRequestData<RouteT extends sd.Route<any>> = (
    {
        params : (
            "paramF" extends keyof RouteT["data"] ?
                sd.TypeOf<RouteT["data"]["paramF"]> :
                {}
        ),
        query : (
            "queryF" extends keyof RouteT["data"] ?
                sd.TypeOf<RouteT["data"]["queryF"]> :
                {}
        ),
        body : (
            "bodyF" extends keyof RouteT["data"] ?
                sd.TypeOf<RouteT["data"]["bodyF"]> :
                {}
        ),
        headers : (
            "headerF" extends keyof RouteT["data"] ?
                sd.TypeOf<RouteT["data"]["headerF"]> :
                {}
        ),
    }
);
export type RouteToResponseData<RouteT extends sd.Route<any>, LocalsT extends object> = (
    "responseF" extends keyof RouteT["data"] ?
        {
            locals   : LocalsT,
            response : sd.AcceptsOf<RouteT["data"]["responseF"]>,
        } :
        {
            locals : LocalsT
        }
);

export class RouteBuilder<
    RequestDataT extends RequestData,
    ResponseDataT extends ResponseData,
    RouterT extends expressCore.IRouter|undefined = undefined
> {
    private route : sd.Route<sd.RouteData>;
    private handlers : HandlerArray<any, any>;
    private rawRouter : RouterT;

    public readonly _dummyRequestDataT?  : RequestDataT;
    public readonly _dummyResponseDataT? : ResponseDataT;
    public readonly _dummyRouterT? : RouterT;

    private constructor (
        route: sd.Route<sd.RouteData>,
        handlers : HandlerArray<any, any>,
        rawRouter : RouterT
    ) {
        this.route = route;
        this.handlers = handlers;
        this.rawRouter = rawRouter;

        this._dummyRequestDataT;
        this._dummyResponseDataT;
        this._dummyRouterT;
    }
    public static Create<
        RouteT extends sd.Route<any>,
        LocalsT extends object
    > (
        route: RouteT
    ) : (
        RouteBuilder<
            RouteToRequestData<RouteT>,
            RouteToResponseData<RouteT, LocalsT>,
            undefined
        >
    ) {
        return new RouteBuilder(
            route,
            [],
            undefined
        );
    }

    public voidHandler (handler : RequestVoidHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    );
    public voidHandler (handler : ErrorVoidHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    );
    public voidHandler (handler : VoidHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    );
    public voidHandler<H extends VoidHandler<any, any>> (handler : H) : (
        H extends VoidHandler<infer Req, infer Res> ?
        (
            CanHandle<Req, Res, RequestDataT, ResponseDataT> extends true ?
            RouteBuilder<
                RequestDataT,
                ResponseDataT,
                RouterT
            > :
            never
        ) :
        never
    );
    public voidHandler (handler : VoidHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    ) {
        return new RouteBuilder(
            this.route,
            [
                ...this.handlers,
                handler
            ],
            this.rawRouter
        );
    }
    public handler<NxtL extends object> (handler : RequestHandler<RequestDataT, ResponseDataT, NxtL>) : (
        RouteBuilder<
            RequestDataT,
            {
                [key in keyof ResponseDataT] : (
                    key extends "locals" ?
                    Assign<ResponseDataT["locals"], NxtL> :
                    ResponseDataT[key]
                )
            },
            RouterT
        >
    );
    public handler<NxtL extends object> (handler : ErrorHandler<RequestDataT, ResponseDataT, NxtL>) : (
        RouteBuilder<
            RequestDataT,
            {
                [key in keyof ResponseDataT] : (
                    key extends "locals" ?
                    Assign<ResponseDataT["locals"], NxtL> :
                    ResponseDataT[key]
                )
            },
            RouterT
        >
    );
    public handler<H extends Handler<any, any, any>> (handler : H) : (
        H extends Handler<infer Req, infer Res, infer NxtL> ?
        (
            CanHandle<Req, Res, RequestDataT, ResponseDataT> extends true ?
            RouteBuilder<
                RequestDataT,
                {
                    [key in keyof ResponseDataT] : (
                        key extends "locals" ?
                        Assign<ResponseDataT["locals"], NxtL> :
                        ResponseDataT[key]
                    )
                },
                RouterT
            > :
            never
        ) :
        never
    );
    public handler<H extends Handler<any, any, any>> (handler : H) : any {
        const newHandler = wrapHandler(handler);
        return new RouteBuilder(
            this.route,
            [
                ...this.handlers,
                newHandler
            ],
            this.rawRouter
        ) as any;
    }
    public asyncVoidHandler (handler : AsyncRequestVoidHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    );
    public asyncVoidHandler (handler : AsyncErrorVoidHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    );
    public asyncVoidHandler (handler : AsyncVoidHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    );
    public asyncVoidHandler<H extends AsyncVoidHandler<any, any>> (handler : H) : (
        H extends AsyncVoidHandler<infer Req, infer Res> ?
        (
            CanHandle<Req, Res, RequestDataT, ResponseDataT> extends true ?
            RouteBuilder<
                RequestDataT,
                ResponseDataT,
                RouterT
            > :
            never
        ) :
        never
    );
    public asyncVoidHandler (handler : AsyncVoidHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    ) {
        const newHandler = wrapAsyncVoidHandler(handler);
        return new RouteBuilder(
            this.route,
            [
                ...this.handlers,
                newHandler
            ],
            this.rawRouter
        );
    }

    public asyncJsonHandler (handler : AsyncRequestJsonHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    );
    public asyncJsonHandler (handler : AsyncErrorJsonHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    );
    public asyncJsonHandler (handler : AsyncJsonHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    );
    public asyncJsonHandler<H extends AsyncJsonHandler<any, any>> (handler : H) : (
        H extends AsyncJsonHandler<infer Req, infer Res> ?
        (
            CanHandle<Req, Res, RequestDataT, ResponseDataT> extends true ?
            RouteBuilder<
                RequestDataT,
                ResponseDataT,
                RouterT
            > :
            never
        ) :
        never
    );
    public asyncJsonHandler (handler : AsyncJsonHandler<RequestDataT, ResponseDataT>) : (
        RouteBuilder<
            RequestDataT,
            ResponseDataT,
            RouterT
        >
    ) {
        const newHandler = wrapAsyncJsonHandler(handler);
        return new RouteBuilder(
            this.route,
            [
                ...this.handlers,
                newHandler
            ],
            this.rawRouter
        );
    }

    public static GetRouterMatcher (router : expressCore.IRouter, method : Exclude<sd.MethodLiteral, "Contextual">) : express.IRouterMatcher<expressCore.IRouter> {
        switch (method) {
            case "GET": {
                return router.get.bind(router);
            }
            case "POST": {
                return router.post.bind(router);
            }
            case "PUT": {
                return router.put.bind(router);
            }
            case "DELETE": {
                return router.delete.bind(router);
            }
            case "PATCH": {
                return router.patch.bind(router);
            }
            case "HEAD": {
                return router.head.bind(router);
            }
            case "OPTIONS": {
                return router.options.bind(router);
            }
            case "CONNECT": {
                return router.connect.bind(router);
            }
            default: {
                throw new Error(`Method ${method} not allowed`);
            }
        }
    }

    public setRouter (rawRouter : expressCore.IRouter) : RouteBuilder<
        RequestDataT,
        ResponseDataT,
        expressCore.IRouter
    > {
        return new RouteBuilder(
            this.route,
            this.handlers,
            rawRouter
        );
    }

    public build (this : RouteBuilder<
        RequestDataT,
        ResponseDataT,
        expressCore.IRouter
    >) : void {
        const matcher = RouteBuilder.GetRouterMatcher(this.rawRouter, this.route.getMethod());
        const handlers : VoidHandler<any, any>[] = [
            wrapResponseHandler(this.route),
            SchemaHandler.CreateParameter(
                this.route.data.paramF == undefined ?
                    () => ({}) :
                    this.route.data.paramF
            ),
            SchemaHandler.CreateQuery(
                this.route.data.queryF == undefined ?
                    () => ({}) :
                    this.route.data.queryF
            ),
            SchemaHandler.CreateBody(
                this.route.data.bodyF == undefined ?
                    () => ({}) :
                    this.route.data.bodyF
            ),
            SchemaHandler.CreateHeader(
                this.route.data.headerF == undefined ?
                    () => ({}) :
                    this.route.data.headerF
            ),
            ...this.handlers
        ];
        matcher(
            this.route.data.path.getRouterPath(),
            ...handlers
        );
    }
}
