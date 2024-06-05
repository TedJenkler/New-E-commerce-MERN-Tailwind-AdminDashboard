import * as express from "express";
import * as sd from "schema-decorator";
import { RequestVoidHandler } from "./VoidHandler";
export declare function wrapResponse<ResponseF extends undefined | sd.AnyAssertFunc = undefined>(res: express.Response, responseF: ResponseF): void;
export declare function wrapResponseHandler<RouteT extends sd.Route<any>>(route: RouteT): RequestVoidHandler<RouteT, any>;
