//import * as sd from "schema-decorator";
import {Request, RequestData} from "./Request";
import {Response, ResponseData} from "./Response";
import {NextFunction} from "./NextFunction";
import {VoidNextFunction} from "./VoidNextFunction";
import {VoidHandler} from "./VoidHandler";
import {assign} from "./assign";

export interface RequestHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object> {
    (
        req  : Request<RequestDataT>,
        res  : Response<ResponseDataT>,
        next : NextFunction<NxtLocalsT>
    ): void;
}
export interface ErrorHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object> {
    (
        err  : any,
        req  : Request<RequestDataT>,
        res  : Response<ResponseDataT>,
        next : NextFunction<NxtLocalsT>
    ): void;
}
export type Handler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object> = (
    RequestHandler<RequestDataT, ResponseDataT, NxtLocalsT> |
    ErrorHandler<RequestDataT, ResponseDataT, NxtLocalsT>
)

export function isRequestHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object> (
    handler : Handler<RequestDataT, ResponseDataT, NxtLocalsT>
) : handler is RequestHandler<RequestDataT, ResponseDataT, NxtLocalsT> {
    return handler.length <= 3;
}

//This lets us treat all handlers the same
export function wrapHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object> (
    handler : Handler<RequestDataT, ResponseDataT, NxtLocalsT>
) : (
    VoidHandler<RequestDataT, ResponseDataT>
) {
    if (isRequestHandler(handler)) {
        const requestVoidHandler = (req : Request<RequestDataT>, res : Response<ResponseDataT>, next : VoidNextFunction) => {
            const n : NextFunction<NxtLocalsT> = ((err : any, nxtLocals : NxtLocalsT) => {
                //Overwrite res.locals
                assign(res.locals, nxtLocals);
                next(err);
            }) as any;
            n.error = (err : any) => {
                if (err == undefined) {
                    next(new Error(`An unknown error occurred`));
                } else {
                    next(err);
                }
            };
            handler(req, res, n);
        };
        return requestVoidHandler;
    } else {
        const errorVoidHandler = (err : any, req : Request<RequestDataT>, res : Response<ResponseDataT>, next : VoidNextFunction) => {
            const n : NextFunction<NxtLocalsT> = ((err : any, nxtLocals : NxtLocalsT) => {
                //Overwrite res.locals
                assign(res.locals, nxtLocals);
                next(err);
            }) as any;
            n.error = (err : any) => {
                if (err == undefined) {
                    next(new Error(`An unknown error occurred`));
                } else {
                    next(err);
                }
            };
            handler(err, req, res, n);
        };
        return errorVoidHandler;
    }
}
