import { Request, RequestData } from "./Request";
import { Response, ResponseData } from "./Response";
import { NextFunction } from "./NextFunction";
import { VoidHandler } from "./VoidHandler";
export interface RequestHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object> {
    (req: Request<RequestDataT>, res: Response<ResponseDataT>, next: NextFunction<NxtLocalsT>): void;
}
export interface ErrorHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object> {
    (err: any, req: Request<RequestDataT>, res: Response<ResponseDataT>, next: NextFunction<NxtLocalsT>): void;
}
export declare type Handler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object> = (RequestHandler<RequestDataT, ResponseDataT, NxtLocalsT> | ErrorHandler<RequestDataT, ResponseDataT, NxtLocalsT>);
export declare function isRequestHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object>(handler: Handler<RequestDataT, ResponseDataT, NxtLocalsT>): handler is RequestHandler<RequestDataT, ResponseDataT, NxtLocalsT>;
export declare function wrapHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData, NxtLocalsT extends object>(handler: Handler<RequestDataT, ResponseDataT, NxtLocalsT>): (VoidHandler<RequestDataT, ResponseDataT>);
