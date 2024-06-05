import * as sd from "schema-decorator";
import * as expressCore from "express-serve-static-core";
import { Handler, RequestHandler, ErrorHandler } from "./Handler";
import { VoidHandler, RequestVoidHandler, ErrorVoidHandler } from "./VoidHandler";
import { DefaultLocalsT } from "./DefaultLocalsT";
import { RouteBuilder, RouteToRequestData, RouteToResponseData } from "./RouteBuilder";
import { Assign } from "./assign";
import { CanHandle } from "./CanHandle";
export declare class Router<LocalsT extends object = DefaultLocalsT, AppT extends expressCore.Express | undefined = undefined> {
    private rawRouter;
    private rawApp;
    private handlers;
    _dummyLocalsT?: LocalsT;
    _dummyAppT?: AppT;
    constructor(rawRouter: expressCore.Router, rawApp: AppT, handlers?: VoidHandler<any, any>[]);
    static Create<LocalsT extends object>(rawRouter?: expressCore.Router): Router<LocalsT, undefined>;
    getRawRouter(): expressCore.Router;
    useVoid(handler: RequestVoidHandler<{}, {
        locals: LocalsT;
    }>): Router<LocalsT, AppT>;
    useVoid(handler: ErrorVoidHandler<{}, {
        locals: LocalsT;
    }>): Router<LocalsT, AppT>;
    useVoid(handler: VoidHandler<{}, {
        locals: LocalsT;
    }>): Router<LocalsT, AppT>;
    useVoid<H extends VoidHandler<any, any>>(handler: H): (H extends VoidHandler<infer Req, infer Res> ? (CanHandle<Req, Res, {}, {
        locals: LocalsT;
    }> extends true ? Router<LocalsT, AppT> : never) : never);
    use<L extends object>(handler: RequestHandler<{}, {
        locals: LocalsT;
    }, L>): Router<Assign<LocalsT, L>, AppT>;
    use<L extends object>(handler: ErrorHandler<{}, {
        locals: LocalsT;
    }, L>): Router<Assign<LocalsT, L>, AppT>;
    use<L extends object>(handler: Handler<{}, {
        locals: LocalsT;
    }, L>): Router<Assign<LocalsT, L>, AppT>;
    use<H extends Handler<any, any, any>>(handler: H): (H extends Handler<infer Req, infer Res, infer L> ? (CanHandle<Req, Res, {}, {
        locals: LocalsT;
    }> extends true ? Router<Assign<LocalsT, L>, AppT> : never) : never);
    voidHandler(handler: RequestVoidHandler<{}, {
        locals: LocalsT;
    }>): Router<LocalsT, AppT>;
    voidHandler(handler: ErrorVoidHandler<{}, {
        locals: LocalsT;
    }>): Router<LocalsT, AppT>;
    voidHandler(handler: VoidHandler<{}, {
        locals: LocalsT;
    }>): Router<LocalsT, AppT>;
    voidHandler<H extends VoidHandler<any, any>>(handler: H): (H extends VoidHandler<infer Req, infer Res> ? (CanHandle<Req, Res, {}, {
        locals: LocalsT;
    }> extends true ? Router<LocalsT, AppT> : never) : never);
    handler<L extends object>(handler: RequestHandler<{}, {
        locals: LocalsT;
    }, L>): Router<Assign<LocalsT, L>, AppT>;
    handler<L extends object>(handler: ErrorHandler<{}, {
        locals: LocalsT;
    }, L>): Router<Assign<LocalsT, L>, AppT>;
    handler<L extends object>(handler: Handler<{}, {
        locals: LocalsT;
    }, L>): Router<Assign<LocalsT, L>, AppT>;
    handler<H extends Handler<any, any, any>>(handler: H): (H extends Handler<infer Req, infer Res, infer L> ? (CanHandle<Req, Res, {}, {
        locals: LocalsT;
    }> extends true ? Router<Assign<LocalsT, L>, AppT> : never) : never);
    add<RouteT extends sd.Route<any>>(route: RouteT): (RouteBuilder<RouteToRequestData<RouteT>, RouteToResponseData<RouteT, LocalsT>, expressCore.IRouter>);
    setApp(rawApp: expressCore.Express): Router<LocalsT, expressCore.Express>;
    getApp(): AppT;
    build(this: Router<LocalsT, expressCore.Express>): void;
}
