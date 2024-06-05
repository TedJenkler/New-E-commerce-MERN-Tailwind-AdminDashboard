//import * as sd from "schema-decorator";
import {Request, RequestData} from "./Request";
import {Response, ResponseData} from "./Response";
import {VoidNextFunction} from "./VoidNextFunction";
import {VoidHandler} from "./VoidHandler";

export interface AsyncRequestVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (
        req  : Request<RequestDataT>,
        res  : Response<ResponseDataT>
    ): Promise<void>;
}

export interface AsyncErrorVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (
        err  : any,
        req  : Request<RequestDataT>,
        res  : Response<ResponseDataT>
    ): Promise<void>;
}

export type AsyncVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> = (
    AsyncRequestVoidHandler<RequestDataT, ResponseDataT> |
    AsyncErrorVoidHandler<RequestDataT, ResponseDataT>
);

export function isAsyncRequestVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> (
    handler : AsyncVoidHandler<RequestDataT, ResponseDataT>
) : handler is AsyncRequestVoidHandler<RequestDataT, ResponseDataT> {
    return handler.length <= 2;
}

//This lets us treat all handlers the same
export function wrapAsyncVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> (
    handler : AsyncVoidHandler<RequestDataT, ResponseDataT>
) : VoidHandler<RequestDataT, ResponseDataT> {
    if (isAsyncRequestVoidHandler(handler)) {
        return (req : Request<RequestDataT>, res : Response<ResponseDataT>, next : VoidNextFunction) => {
            handler(req, res)
                .then(next)
                .catch(next);
        };
    } else {
        return (err, req, res, next) => {
            handler(err, req, res)
                .then(next)
                .catch(next);
        };
    }
}
