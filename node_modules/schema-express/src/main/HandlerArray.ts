//import * as sd from "schema-decorator";
//import {Handler} from "./Handler";
import {VoidHandler} from "./VoidHandler";
import {RequestData} from "./Request";
import {ResponseData} from "./Response";

export type HandlerArray<RequestDataT extends RequestData, ResponseDataT extends ResponseData> = (
    //Handler<RequestDataT, ResponseDataT, any>|
    VoidHandler<RequestDataT, ResponseDataT>
)[];
