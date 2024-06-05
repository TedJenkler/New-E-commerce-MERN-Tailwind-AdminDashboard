import * as expressCore from "express-serve-static-core";
import { DefaultLocalsT } from "./DefaultLocalsT";
import { Handler, RequestHandler, ErrorHandler } from "./Handler";
import { VoidHandler, RequestVoidHandler, ErrorVoidHandler } from "./VoidHandler";
import { Router } from "./Router";
import { Assign } from "./assign";
import { CanHandle } from "./CanHandle";
export interface RouterMatcher<LocalsT extends object, ReturnT> {
    (path: string, ...handlers: (RequestVoidHandler<{}, {
        locals: LocalsT;
    }>)[]): ReturnT;
    (path: string, ...handlers: (ErrorVoidHandler<{}, {
        locals: LocalsT;
    }>)[]): ReturnT;
    (path: string, ...handlers: (RequestHandler<{}, {
        locals: LocalsT;
    }, any>)[]): ReturnT;
    (path: string, ...handlers: (ErrorHandler<{}, {
        locals: LocalsT;
    }, any>)[]): ReturnT;
    (path: string, ...handlers: (VoidHandler<{}, {
        locals: LocalsT;
    }> | Handler<{}, {
        locals: LocalsT;
    }, any>)[]): ReturnT;
}
export declare function toRouterMatcher<LocalsT extends Object, ReturnT>(matcher: expressCore.IRouterMatcher<any>, returnValue: ReturnT): RouterMatcher<LocalsT, ReturnT>;
export declare class App<LocalsT extends Object = DefaultLocalsT> {
    private rawApp;
    private _dummyLocalsT?;
    get: RouterMatcher<LocalsT, this>;
    post: RouterMatcher<LocalsT, this>;
    put: RouterMatcher<LocalsT, this>;
    delete: RouterMatcher<LocalsT, this>;
    patch: RouterMatcher<LocalsT, this>;
    head: RouterMatcher<LocalsT, this>;
    options: RouterMatcher<LocalsT, this>;
    connect: RouterMatcher<LocalsT, this>;
    constructor(rawApp?: expressCore.Express);
    getRawApp(): expressCore.Express;
    useVoid(handler: RequestVoidHandler<{}, {
        locals: LocalsT;
    }>): App<LocalsT>;
    useVoid(handler: ErrorVoidHandler<{}, {
        locals: LocalsT;
    }>): App<LocalsT>;
    useVoid(handler: VoidHandler<{}, {
        locals: LocalsT;
    }>): App<LocalsT>;
    useVoid<H extends VoidHandler<any, any>>(handler: H): (H extends VoidHandler<infer Req, infer Res> ? (CanHandle<Req, Res, {}, {
        locals: LocalsT;
    }> extends true ? App<LocalsT> : never) : never);
    use<L extends object>(handler: RequestHandler<{}, {
        locals: LocalsT;
    }, L>): App<Assign<LocalsT, L>>;
    use<L extends object>(handler: ErrorHandler<{}, {
        locals: LocalsT;
    }, L>): App<Assign<LocalsT, L>>;
    use<L extends object>(handler: Handler<{}, {
        locals: LocalsT;
    }, L>): App<Assign<LocalsT, L>>;
    use<H extends Handler<any, any, any>>(handler: H): (H extends Handler<infer Req, infer Res, infer L> ? (CanHandle<Req, Res, {}, {
        locals: LocalsT;
    }> extends true ? App<Assign<LocalsT, L>> : never) : never);
    createRouter(): Router<LocalsT, expressCore.Express>;
    useRouter(root: string, router: Router<any, expressCore.Express | undefined>): void;
}
