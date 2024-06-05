import { RequestData } from "./Request";
import { ResponseData, Locals } from "./Response";
export declare type CanHandle<Req extends RequestData, Res extends ResponseData, RequestDataT extends RequestData, ResponseDataT extends ResponseData> = (RequestDataT extends Req ? (Locals<ResponseDataT> extends Locals<Res> ? ("response" extends keyof Res ? ("response" extends keyof ResponseDataT ? (Res["response"] extends ResponseDataT["response"] ? true : false) : false) : true) : false) : false);
