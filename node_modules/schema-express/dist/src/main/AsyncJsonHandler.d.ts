import { Request, RequestData } from "./Request";
import { Response, ResponseData } from "./Response";
import { VoidHandler } from "./VoidHandler";
export declare type AsyncJsonReturnType<ResponseDataT extends ResponseData> = ("response" extends keyof ResponseDataT ? ResponseDataT["response"] | number : void | undefined | number);
export interface AsyncRequestJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (req: Request<RequestDataT>, res: Response<ResponseDataT>): (AsyncJsonReturnType<ResponseDataT> | Promise<AsyncJsonReturnType<ResponseDataT>>);
}
export interface AsyncErrorJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (err: any, req: Request<RequestDataT>, res: Response<ResponseDataT>): (AsyncJsonReturnType<ResponseDataT> | Promise<AsyncJsonReturnType<ResponseDataT>>);
}
export declare type AsyncJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> = (AsyncRequestJsonHandler<RequestDataT, ResponseDataT> | AsyncErrorJsonHandler<RequestDataT, ResponseDataT>);
export declare function isAsyncRequestJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData>(handler: AsyncJsonHandler<RequestDataT, ResponseDataT>): handler is AsyncRequestJsonHandler<RequestDataT, ResponseDataT>;
export declare function wrapAsyncJsonHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData>(handler: AsyncJsonHandler<RequestDataT, ResponseDataT>): VoidHandler<RequestDataT, ResponseDataT>;
