//import * as sd from "schema-decorator";
import {Request, RequestData} from "./Request";
import {Response, ResponseData} from "./Response";
import {VoidNextFunction} from "./VoidNextFunction";

export interface RequestVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (
        req  : Request<RequestDataT>,
        res  : Response<ResponseDataT>,
        next : VoidNextFunction
    ): void;
}

export interface ErrorVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (
        err  : any,
        req  : Request<RequestDataT>,
        res  : Response<ResponseDataT>,
        next : VoidNextFunction
    ): void;
}

export type VoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> = (
    RequestVoidHandler<RequestDataT, ResponseDataT> |
    ErrorVoidHandler<RequestDataT, ResponseDataT>
);

export function isRequestVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> (
    handler : VoidHandler<RequestDataT, ResponseDataT>
) : handler is RequestVoidHandler<RequestDataT, ResponseDataT> {
    return handler.length <= 3;
}
