import * as axios from "axios";
import {Route, RouteData, IRoute} from "./Route";
import {Api} from "./Api";
import {
    ChainedAssertFunc,
    AcceptsOf,
    TypeOf,
    toAssertDelegateExact,
    AssertFunc,
    AnyAssertFunc
} from "../types";

export type TransformBodyDelegate = (rawBody : any|undefined) => any;
export type TypedTransformBodyDelegate<BodyT> = (rawBody : BodyT) => any;
export type InjectHeaderDelegate  = (route : IRoute<RouteData>) => any;
export type TransformResponseDelegate = (rawResponseData : any, rawResponse : axios.AxiosResponse<any>) => any;

//304
export interface OnUnmodifiedArgs extends Error {
    config : axios.AxiosRequestConfig;
    code? : string;
    request : unknown;
    response : axios.AxiosResponse<unknown>;
}
export type OnUnmodifiedDelegate<ResultT> = (args : OnUnmodifiedArgs) => ResultT;

//400
export interface OnSyntacticErrorArgs extends Error {
    config : axios.AxiosRequestConfig;
    code? : string;
    request : unknown;
    response : axios.AxiosResponse<unknown>;
}
export type OnSyntacticErrorDelegate<ResultT> = (args : OnSyntacticErrorArgs) => ResultT;

//401
export interface OnUnauthorizedArgs extends Error {
    config : axios.AxiosRequestConfig;
    code? : string;
    request : unknown;
    response : axios.AxiosResponse<unknown>;
}
export type OnUnauthorizedDelegate<ResultT> = (args : OnUnauthorizedArgs) => ResultT;

//403
export interface OnForbiddenArgs extends Error {
    config : axios.AxiosRequestConfig;
    code? : string;
    request : unknown;
    response : axios.AxiosResponse<unknown>;
}
export type OnForbiddenDelegate<ResultT> = (args : OnForbiddenArgs) => ResultT;

//404
export interface OnNotFoundArgs extends Error {
    config : axios.AxiosRequestConfig;
    code? : string;
    request : unknown;
    response : axios.AxiosResponse<unknown>;
}
export type OnNotFoundDelegate<ResultT> = (args : OnNotFoundArgs) => ResultT;

//422 - The format is correct (e.g. JSON) but the data makes no sense
//For example, depositing a negative amount into a bank account
export interface OnSemanticErrorArgs extends Error {
    config : axios.AxiosRequestConfig;
    code? : string;
    request : unknown;
    response : axios.AxiosResponse<unknown>;
}
export type OnSemanticErrorDelegate<ResultT> = (args : OnSemanticErrorArgs) => ResultT;

export type OnSyntacticOrSemanticErrorArgs = (
    OnSyntacticErrorArgs &
    OnSemanticErrorArgs
);
export type OnSyntacticOrSemanticErrorDelegate<ResultT> = (
    (args : OnSyntacticOrSemanticErrorArgs) => ResultT
);

//429 - Too many requests have been made in a period of time
//Wait a while before trying again.
//Maybe see the "Retry-After" header for how long to wait;
//the header may or may not be set, though.
export interface OnTooManyRequestsArgs extends Error {
    config : axios.AxiosRequestConfig;
    code? : string;
    request : unknown;
    response : axios.AxiosResponse<unknown>;
}
export type OnTooManyRequestsDelegate<ResultT> = (args : OnTooManyRequestsArgs) => ResultT;

export type UnwrappedPromiseReturnType<F extends (...args : any[]) => any> = (
    ReturnType<F> extends Promise<infer WrappedT> ?
    WrappedT :
    ReturnType<F>
);

export type RequestWithResponse = (
    IRequest<RequestData> &
    {
        data : {
            route : {
                data : {
                    responseF : AnyAssertFunc
                }
            }
        }
    }
);
export type RequestResponse<ReqT extends IRequest<RequestData>> = (
    ReqT["data"]["route"]["data"]["responseF"] extends AnyAssertFunc ?
    TypeOf<ReqT["data"]["route"]["data"]["responseF"]> :
    any
);
export type AssertRequestCanGetPath<ReqT extends IRequest<any>> = (
    (
        (
            (
                "paramF" extends keyof ReqT["data"]["route"]["data"] ?
                    (
                        "param" extends keyof ReqT["data"] ?
                            true :
                            false
                    ) :
                    true
            )
        ) extends true ?
        ReqT :
            never
    )
);
export type AssertRequestCanSend<ReqT extends IRequest<any>> = (
    (
        (
            "paramF" extends keyof ReqT["data"]["route"]["data"] ?
                (
                    "param" extends keyof ReqT["data"] ?
                        true :
                        false
                ) :
                true
        ) |
        (
            "queryF" extends keyof ReqT["data"]["route"]["data"] ?
                (
                    "query" extends keyof ReqT["data"] ?
                        true :
                        false
                ) :
                true
        ) |
        (
            "bodyF" extends keyof ReqT["data"]["route"]["data"] ?
                (
                    "body" extends keyof ReqT["data"] ?
                        true :
                        false
                ) :
                true
        ) |
        (
            "headerF" extends keyof ReqT["data"]["route"]["data"] ?
                (
                    "header" extends keyof ReqT["data"] ?
                        true :
                        false
                ) :
                true
        )
    ) extends true ?
        ReqT :
        never
);

export enum ResponseType {
    Normal, //If no response delegates were called
    Unmodified,
    SyntacticError,
    Unauthorized,
    Forbidden,
    NotFound,
    SemanticError,
    TooManyRequests,
}
export interface Response<TypeT extends ResponseType, DataT> extends axios.AxiosResponse<DataT> {
    type : TypeT;
}

export type OnStatusHandlerNameToResponseType = {
    onUnmodified      : ResponseType.Unmodified,
    onSyntacticError  : ResponseType.SyntacticError,
    onUnauthorized    : ResponseType.Unauthorized,
    onForbidden       : ResponseType.Forbidden,
    onNotFound        : ResponseType.NotFound,
    onSemanticError   : ResponseType.SemanticError,
    onTooManyRequests : ResponseType.TooManyRequests,
};

export type OnStatusHandlerResponse<
    DataT extends RequestData
> = (
    {
        [k in keyof OnStatusHandlerNameToResponseType] : (
            k extends keyof DataT ?
            Response<
                OnStatusHandlerNameToResponseType[k],
                UnwrappedPromiseReturnType<Exclude<
                    DataT[k],
                    undefined
                >>
            > :
            never
        )
    }[keyof OnStatusHandlerNameToResponseType]
);

export interface RequestData {
    readonly route : IRoute<RouteData>;

    readonly param?  : any;
    readonly query?  : any;
    readonly body?   : any;
    readonly header? : any;

    readonly onUnmodified? : OnUnmodifiedDelegate<any>;
    readonly onSyntacticError? : OnSyntacticErrorDelegate<any>;
    readonly onUnauthorized? : OnUnauthorizedDelegate<any>;
    readonly onForbidden? : OnForbiddenDelegate<any>;
    readonly onNotFound? : OnNotFoundDelegate<any>;
    readonly onSemanticError? : OnSemanticErrorDelegate<any>;
    readonly onTooManyRequests? : OnTooManyRequestsDelegate<any>;
}
export interface RequestExtraData {
    readonly api : Api;
    readonly onTransformBody? : TransformBodyDelegate;
    readonly onInjectHeader?  : InjectHeaderDelegate;
    readonly onTransformResponse? : TransformResponseDelegate;
}

export interface IRequest<DataT extends RequestData> {
    readonly data : DataT;
    readonly extraData : RequestExtraData;
}

export class Request<DataT extends RequestData> implements IRequest<DataT> {
    public static Create<RouteT extends Route<any>> (
        api : Api,
        route : RouteT
    ) : (
        Request<{
            route : RouteT,
        }>
    ) {
        return new Request(
            {
                route : route,
            },
            {
                api   : api,
            }
        );
    }
    private constructor (
        public readonly data : DataT,
        public readonly extraData : RequestExtraData,
    ) {
    }
    public setParam (
        this : (
            DataT extends {
                route : {
                    data : {
                        paramF : ChainedAssertFunc<any>
                    }
                },
            } ?
                (
                    "param" extends keyof DataT ?
                        never :
                        Request<DataT>
                ) :
                never
        ),
        param : AcceptsOf<Exclude<
            DataT["route"]["data"]["paramF"],
            undefined
        >>
    ) : (
        Request<
            DataT &
            {
                param : TypeOf<Exclude<
                    DataT["route"]["data"]["paramF"],
                    undefined
                >>
            }
        >
    ) {
        const d = toAssertDelegateExact(this.data.route.data.paramF);
        d("param", param);
        return new Request(
            {
                ...(this.data as any),
                param : param,
            },
            this.extraData
        );
    }
    public setQuery (
        this : (
            DataT extends {
                route : {
                    data : {
                        queryF : AssertFunc<any>
                    }
                },
            } ?
                (
                    "query" extends keyof DataT ?
                        never :
                        Request<DataT>
                ) :
                never
        ),
        query : AcceptsOf<Exclude<
            DataT["route"]["data"]["queryF"],
            undefined
        >>
    ) : (
        Request<
            DataT &
            {
                query : TypeOf<Exclude<
                    DataT["route"]["data"]["queryF"],
                    undefined
                >>
            }
        >
    ) {
        const d = toAssertDelegateExact(this.data.route.data.queryF);
        d("query", query);
        return new Request(
            {
                ...(this.data as any),
                query : query,
            },
            this.extraData
        );
    }
    public setBody (
        this : (
            DataT extends {
                route : {
                    data : {
                        bodyF : AssertFunc<any>
                    }
                },
            } ?
                (
                    "body" extends keyof DataT ?
                        never :
                        Request<DataT>
                ) :
                never
        ),
        body : AcceptsOf<Exclude<
            DataT["route"]["data"]["bodyF"],
            undefined
        >>
    ) : (
        Request<
            DataT &
            {
                body : TypeOf<Exclude<
                    DataT["route"]["data"]["bodyF"],
                    undefined
                >>
            }
        >
    ) {
        const d = toAssertDelegateExact(this.data.route.data.bodyF);
        d("body", body);
        return new Request(
            {
                ...(this.data as any),
                body : body,
            },
            this.extraData
        );
    }
    //Special, does not eliminate extra header keys,
    //But does not check their values, either
    public setHeader (
        this : (
            DataT extends {
                route : {
                    data : {
                        headerF : AssertFunc<any>
                    }
                },
            } ?
                (
                    "header" extends keyof DataT ?
                        never :
                        Request<DataT>
                ) :
                never
        ),
        header : AcceptsOf<Exclude<
            DataT["route"]["data"]["headerF"],
            undefined
        >>
    ) : (
        Request<
            DataT &
            {
                header : TypeOf<Exclude<
                    DataT["route"]["data"]["headerF"],
                    undefined
                >>
            }
        >
    ) {
        const d = toAssertDelegateExact(this.data.route.data.headerF);
        d("header", header);
        return new Request(
            {
                ...(this.data as any),
                header : header,
            },
            this.extraData
        );
    }
    public setOnTransformBody (
        onTransformBody : TypedTransformBodyDelegate<
            "bodyF" extends keyof DataT["route"]["data"] ?
                (
                    undefined extends DataT["route"]["data"]["bodyF"] ?
                    unknown :
                    TypeOf<Exclude<DataT["route"]["data"]["bodyF"], undefined>>
                ) :
                unknown
        >|undefined
    ) : (
        Request<DataT>
    ) {
        return new Request(
            this.data,
            {
                ...(this.extraData as any),
                onTransformBody : onTransformBody,
            },
        );
    }
    public setOnInjectHeader (onInjectHeader : InjectHeaderDelegate|undefined) : (
        Request<DataT>
    ) {
        return new Request(
            this.data,
            {
                ...(this.extraData as any),
                onInjectHeader : onInjectHeader,
            }
        );
    }
    public chainOnInjectHeader (onInjectHeader : InjectHeaderDelegate) : (
        Request<DataT>
    ) {
        if (this.extraData.onInjectHeader == undefined) {
            return this.setOnInjectHeader(onInjectHeader);
        }
        const previousOnInjectHeader = this.extraData.onInjectHeader;
        return new Request(
            this.data,
            {
                ...(this.extraData as any),
                onInjectHeader : (route) => {
                    const previousHeader = previousOnInjectHeader(route);
                    const header = onInjectHeader(route);
                    return {
                        ...previousHeader,
                        ...header,
                    };
                },
            }
        );
    }
    public setOnTransformResponse (onTransformResponse : TransformResponseDelegate|undefined) : (
        Request<DataT>
    ) {
        return new Request(
            this.data,
            {
                ...(this.extraData as any),
                onTransformResponse : onTransformResponse,
            }
        );
    }
    public setOnUnmodified<D extends OnUnmodifiedDelegate<any>> (onUnmodified : D) : (
        Request<
            DataT &
            {
                readonly onUnmodified : D
            }
        >
    ) {
        return new Request(
            {
                ...(this.data as any),
                onUnmodified : onUnmodified,
            },
            this.extraData,
        );
    }
    public setOnSyntacticError<D extends OnSyntacticErrorDelegate<any>> (onSyntacticError : D) : (
        Request<
            DataT &
            {
                readonly onSyntacticError : D
            }
        >
    ) {
        return new Request(
            {
                ...(this.data as any),
                onSyntacticError : onSyntacticError,
            },
            this.extraData,
        );
    }
    public setOnUnauthorized<D extends OnUnauthorizedDelegate<any>> (onUnauthorized : D) : (
        Request<
            DataT &
            {
                readonly onUnauthorized : D
            }
        >
    ) {
        return new Request(
            {
                ...(this.data as any),
                onUnauthorized : onUnauthorized,
            },
            this.extraData,
        );
    }
    public setOnForbidden<D extends OnForbiddenDelegate<any>> (onForbidden : D) : (
        Request<
            DataT &
            {
                readonly onForbidden : D
            }
        >
    ) {
        return new Request(
            {
                ...(this.data as any),
                onForbidden : onForbidden,
            },
            this.extraData,
        );
    }
    public setOnNotFound<D extends OnNotFoundDelegate<any>> (onNotFound : D) : (
        Request<
            DataT &
            {
                readonly onNotFound : D
            }
        >
    ) {
        return new Request(
            {
                ...(this.data as any),
                onNotFound : onNotFound,
            },
            this.extraData,
        );
    }
    public setOnSemanticError<D extends OnSemanticErrorDelegate<any>> (onSemanticError : D) : (
        Request<
            DataT &
            {
                readonly onSemanticError : D
            }
        >
    ) {
        return new Request(
            {
                ...(this.data as any),
                onSemanticError : onSemanticError,
            },
            this.extraData,
        );
    }
    public setOnTooManyRequests<D extends OnTooManyRequestsDelegate<any>> (onTooManyRequests : D) : (
        Request<
            DataT &
            {
                readonly onTooManyRequests : D
            }
        >
    ) {
        return new Request(
            {
                ...(this.data as any),
                onTooManyRequests : onTooManyRequests,
            },
            this.extraData,
        );
    }

    //Convenience
    public setOnSyntacticOrSemanticError<
        D extends OnSyntacticOrSemanticErrorDelegate<any>
    > (onSyntacticOrSemanticErrorDelegate : D) : (
        Request<
            DataT &
            {
                readonly onSyntacticError : D,
                readonly onSemanticError : D,
            }
        >
    ) {
        return new Request(
            {
                ...(this.data as any),
                onSyntacticError : onSyntacticOrSemanticErrorDelegate,
                onSemanticError : onSyntacticOrSemanticErrorDelegate,
            },
            this.extraData,
        );
    }

    public getPath (
        this : AssertRequestCanGetPath<Request<DataT>>
    ) {
        return RequestUtil.getPath(this);
    }

    public async send (
        this : AssertRequestCanSend<Request<DataT>>
    ) : (
        Promise<SendResult<Request<DataT>>>
    ) {
        return RequestUtil.send(this);
    }

    getDomain () {
        return this.extraData.api.getDomain();
    }
    getRoot () {
        return this.extraData.api.getRoot();
    }
    getBaseUrl () {
        return this.extraData.api.getBaseUrl();
    }
}

export type SendResult<ReqT extends IRequest<RequestData>> = (
    Response<
        ResponseType.Normal,
        "responseF" extends keyof ReqT["data"]["route"]["data"] ?
            TypeOf<Exclude<
            ReqT["data"]["route"]["data"]["responseF"],
                undefined
            >> :
            unknown
    > |
    OnStatusHandlerResponse<ReqT["data"]>
);

export namespace RequestUtil {
    export function getPath<ReqT extends IRequest<RequestData>> (
        req : AssertRequestCanGetPath<ReqT>
    ) : string {
        const data = req.data;
        const routeData = data.route.data;
        const param = (routeData.paramF == undefined) ?
            {} :
            toAssertDelegateExact(routeData.paramF)(
                `${routeData.path.getRouterPath()} : param`,
                data.param
            );
        const path = routeData.path.getCallingPath(param);
        return path;
    }
    export async function send<ReqT extends IRequest<RequestData>> (
        req : AssertRequestCanSend<ReqT>
    ) : (
        Promise<
            SendResult<ReqT>
        >
    ) {
        const data = req.data;
        const routeData = data.route.data;
        const extraData = req.extraData;

        const method = data.route.getMethod();
        const path = getPath(req);

        let debugName = `${method} ${path}`;

        const query = (routeData.queryF == undefined) ?
            undefined :
            toAssertDelegateExact(routeData.queryF)(
                `${debugName} : query`,
                data.query
            );

        if (query != undefined && Object.keys(query).length > 0) {
            debugName += `?${JSON.stringify(query)}`;
        }
        const body = (routeData.bodyF == undefined) ?
            undefined :
            toAssertDelegateExact(routeData.bodyF)(
                `${debugName} : body`,
                data.body
            );
        //Headers are special
        const injectedHeader = (extraData.onInjectHeader == undefined) ?
            {} :
            await extraData.onInjectHeader(data.route);
        const header = (routeData.headerF == undefined) ?
            injectedHeader :
            {
                //Injected headers are applied first,
                //and may be over-written
                ...injectedHeader,
                //There may be extra header values given
                //that are not asserted
                ...data.header,
                //This assert delegate possibly modifies the values
                //of the header
                ...toAssertDelegateExact(routeData.headerF)(
                    `${debugName} : header`,
                    data.header
                ),
            };

        const transformedBody = (extraData.onTransformBody == undefined) ?
            body :
            await extraData.onTransformBody(body);

        const config : axios.AxiosRequestConfig = {
            method : method as any,
            url : path,
            params : query,
            data : transformedBody,
            headers : header,
        };
        return req.extraData.api.instance.request(config)
            .then(async (result) => {
                (result as any).type = ResponseType.Normal;
                if (routeData.responseF == undefined) {
                    return result as any;
                } else {
                    try {
                        const rawResponse = (extraData.onTransformResponse == undefined) ?
                            result.data :
                            await extraData.onTransformResponse(result.data, result);
                        const response = toAssertDelegateExact(routeData.responseF)(
                            `${debugName} : response`,
                            rawResponse
                        );
                        result.data = response;
                        return result;
                    } catch (err) {
                        if (err != undefined) {
                            err.response = result;
                        }
                        throw err;
                    }
                }
            })
            .catch(async (err) => {
                if (err.config != undefined && err.response != undefined) {
                    const response : axios.AxiosResponse<any> = err.response;

                    switch (response.status) {
                        case 304: {
                            if (req.data.onUnmodified != undefined) {
                                (response as any).type = ResponseType.Unmodified;
                                response.data = await req.data.onUnmodified(err);
                                return response as any;
                            }
                            break;
                        }
                        case 400: {
                            if (req.data.onSyntacticError != undefined) {
                                (response as any).type = ResponseType.SyntacticError;
                                response.data = await req.data.onSyntacticError(err);
                                return response as any;
                            }
                            break;
                        }
                        case 401: {
                            if (req.data.onUnauthorized != undefined) {
                                (response as any).type = ResponseType.Unauthorized;
                                response.data = await req.data.onUnauthorized(err);
                                return response as any;
                            }
                            break;
                        }
                        case 403: {
                            if (req.data.onForbidden != undefined) {
                                (response as any).type = ResponseType.Forbidden;
                                response.data = await req.data.onForbidden(err);
                                return response as any;
                            }
                            break;
                        }
                        case 404: {
                            if (req.data.onNotFound != undefined) {
                                (response as any).type = ResponseType.NotFound;
                                response.data = await req.data.onNotFound(err);
                                return response as any;
                            }
                            break;
                        }
                        case 422: {
                            if (req.data.onSemanticError != undefined) {
                                (response as any).type = ResponseType.SemanticError;
                                response.data = await req.data.onSemanticError(err);
                                return response as any;
                            }
                            break;
                        }
                        case 429: {
                            if (req.data.onTooManyRequests != undefined) {
                                (response as any).type = ResponseType.TooManyRequests;
                                response.data = await req.data.onTooManyRequests(err);
                                return response as any;
                            }
                            break;
                        }
                    }
                }

                throw err;
            });
    }
}