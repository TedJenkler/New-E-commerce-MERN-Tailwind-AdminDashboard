import {RequestData} from "./Request";
import {ResponseData, Locals} from "./Response";

export type CanHandle<
    //Can a handler with these data
    Req extends RequestData,
    Res extends ResponseData,
    //be a handler of a route with these data?
    RequestDataT extends RequestData,
    ResponseDataT extends ResponseData
> = (
    RequestDataT extends Req ?
    (
        Locals<ResponseDataT> extends Locals<Res> ?
        (
            "response" extends keyof Res ?
            (
                "response" extends keyof ResponseDataT ?
                (
                    Res["response"] extends ResponseDataT["response"] ?
                    true :
                    false
                ) :
                false
            ) :
            true
        ) :
        false
    ) :
    false
);