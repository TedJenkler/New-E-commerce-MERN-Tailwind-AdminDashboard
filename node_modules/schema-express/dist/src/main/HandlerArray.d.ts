import { VoidHandler } from "./VoidHandler";
import { RequestData } from "./Request";
import { ResponseData } from "./Response";
export declare type HandlerArray<RequestDataT extends RequestData, ResponseDataT extends ResponseData> = (VoidHandler<RequestDataT, ResponseDataT>)[];
