import { Request, RequestData } from "./Request";
import { Response, ResponseData } from "./Response";
import { VoidHandler } from "./VoidHandler";
export interface AsyncRequestVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (req: Request<RequestDataT>, res: Response<ResponseDataT>): Promise<void>;
}
export interface AsyncErrorVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> {
    (err: any, req: Request<RequestDataT>, res: Response<ResponseDataT>): Promise<void>;
}
export declare type AsyncVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData> = (AsyncRequestVoidHandler<RequestDataT, ResponseDataT> | AsyncErrorVoidHandler<RequestDataT, ResponseDataT>);
export declare function isAsyncRequestVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData>(handler: AsyncVoidHandler<RequestDataT, ResponseDataT>): handler is AsyncRequestVoidHandler<RequestDataT, ResponseDataT>;
export declare function wrapAsyncVoidHandler<RequestDataT extends RequestData, ResponseDataT extends ResponseData>(handler: AsyncVoidHandler<RequestDataT, ResponseDataT>): VoidHandler<RequestDataT, ResponseDataT>;
