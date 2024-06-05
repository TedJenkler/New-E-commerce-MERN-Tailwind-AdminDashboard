//import * as sd from "schema-decorator";
import {Request, RequestData} from "./Request";
import {Response, ResponseData} from "./Response";
import {VoidNextFunction} from "./VoidNextFunction";
import {VoidHandler} from "./VoidHandler";

export type AsyncJsonReturnType<ResponseDataT extends ResponseData> = (
    "response" extends keyof ResponseDataT ?
    ResponseDataT["response"]|number :
    void|undefined|number
);
/*
    Returning a number means just a status code with no body
*/
export interface AsyncRequestJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (
        req  : Request<RequestDataT>,
        res  : Response<ResponseDataT>
    ): (
        AsyncJsonReturnType<ResponseDataT> |
        Promise<
            AsyncJsonReturnType<ResponseDataT>
        >
    );
}

export interface AsyncErrorJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (
        err  : any,
        req  : Request<RequestDataT>,
        res  : Response<ResponseDataT>
    ): (
        AsyncJsonReturnType<ResponseDataT> |
        Promise<
            AsyncJsonReturnType<ResponseDataT>
        >
    );
}

export type AsyncJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> = (
    AsyncRequestJsonHandler<RequestDataT, ResponseDataT> |
    AsyncErrorJsonHandler<RequestDataT, ResponseDataT>
);

export function isAsyncRequestJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> (
    handler : AsyncJsonHandler<RequestDataT, ResponseDataT>
) : handler is AsyncRequestJsonHandler<RequestDataT, ResponseDataT> {
    return handler.length <= 2;
}

//This lets us treat all handlers the same
export function wrapAsyncJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> (
    handler : AsyncJsonHandler<RequestDataT, ResponseDataT>
) : VoidHandler<RequestDataT, ResponseDataT> {
    if (isAsyncRequestJsonHandler(handler)) {
        return async (req : Request<RequestDataT>, res : Response<ResponseDataT>, next : VoidNextFunction) => {
            try {
                const json = await handler(req, res);
                if (typeof json === "number") {
                    res.status(json).end();
                    next();
                } else if (json === undefined) {
                    next();
                } else {
                    (res.json as any)(json);
                    next();
                }
            } catch (err) {
                next(err);
            }
        };
    } else {
        return async (err, req, res, next) => {
            try {
                const json = await handler(err, req, res);
                if (typeof json === "number") {
                    res.status(json).end();
                    next();
                } else if (json === undefined) {
                    next();
                } else {
                    (res.json as any)(json);
                    next();
                }
            } catch (err) {
                next(err);
            }
        };
    }
}
