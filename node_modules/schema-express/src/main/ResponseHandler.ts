import * as express from "express";
import * as sd from "schema-decorator";
import {RequestVoidHandler} from "./VoidHandler";

export function wrapResponse<ResponseF extends undefined|sd.AnyAssertFunc=undefined> (res : express.Response, responseF : ResponseF) : void {
    const responseD = sd.toAssertDelegateExact(
        responseF == undefined ?
            () => ({}) :
            responseF as Exclude<ResponseF, undefined>
    );
    const originalJson = res.json.bind(res);
    res.json = (rawResponse : any) => {
        if (res.statusCode >= 400 && res.statusCode < 600) {
            //We are in an erroneous state, we don't validate anything for now
            return originalJson(rawResponse);
        }
        const cleanResponse = responseD("response", rawResponse);
        const processedResponse = sd.anyToRaw("response", cleanResponse);
        return originalJson(processedResponse);
    };
}
export function wrapResponseHandler<RouteT extends sd.Route<any>> (route : RouteT) : RequestVoidHandler<RouteT, any> {
    return (_req, res, next) => {
        wrapResponse(res, route.data.responseF);
        next();
    };
}
