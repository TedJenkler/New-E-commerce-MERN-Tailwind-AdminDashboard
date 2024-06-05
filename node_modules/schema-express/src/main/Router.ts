import * as sd from "schema-decorator";
import * as expressCore from "express-serve-static-core";
import * as express from "express";
import {Handler, RequestHandler, ErrorHandler, wrapHandler} from "./Handler";
import {VoidHandler, RequestVoidHandler, ErrorVoidHandler} from "./VoidHandler";
import {DefaultLocalsT} from "./DefaultLocalsT";
import {RouteBuilder, RouteToRequestData, RouteToResponseData} from "./RouteBuilder";
import {Assign} from "./assign";
import {CanHandle} from "./CanHandle";

//TODO support param(), they're pretty cool
export class Router <
    LocalsT extends object = DefaultLocalsT,
    AppT extends expressCore.Express|undefined = undefined
> {
    private rawRouter : expressCore.Router;
    private rawApp    : AppT;

    private handlers : VoidHandler<any, any>[] = [];

    public _dummyLocalsT? : LocalsT;
    public _dummyAppT? : AppT;

    public constructor (
        rawRouter : expressCore.Router,
        rawApp : AppT,
        handlers : VoidHandler<any, any>[] = []
    ) {
        this.rawRouter = rawRouter;
        this.rawApp = rawApp;
        this.handlers = handlers;

        this._dummyLocalsT;
        this._dummyAppT;
    }
    public static Create<LocalsT extends object> (rawRouter? : expressCore.Router) : Router<LocalsT, undefined> {
        if (rawRouter == undefined) {
            rawRouter = express.Router();
        }
        return new Router(
            rawRouter,
            undefined
        );
    }
    public getRawRouter () {
        return this.rawRouter;
    }

    //Behaves like express' use()
    public useVoid (handler : RequestVoidHandler<{}, { locals : LocalsT }>) : Router<LocalsT, AppT>;
    public useVoid (handler : ErrorVoidHandler<{}, { locals : LocalsT }>) : Router<LocalsT, AppT>;
    public useVoid (handler : VoidHandler<{}, { locals : LocalsT }>) : Router<LocalsT, AppT>;
    public useVoid<H extends VoidHandler<any, any>> (handler : H) : (
        H extends VoidHandler<infer Req, infer Res> ?
        (
            CanHandle<Req, Res, {}, { locals : LocalsT }> extends true ?
            Router<LocalsT, AppT> :
            never
        ) :
        never
    );
    public useVoid (handler : VoidHandler<{}, { locals : LocalsT }>) : Router<LocalsT, AppT> {
        this.rawRouter.use(handler);
        return this;
    }
    //Behaves like express' use()
    public use<L extends object> (handler : RequestHandler<{}, { locals : LocalsT }, L>) : Router<Assign<LocalsT, L>, AppT>;
    public use<L extends object> (handler : ErrorHandler<{}, { locals : LocalsT }, L>) : Router<Assign<LocalsT, L>, AppT>;
    public use<L extends object> (handler : Handler<{}, { locals : LocalsT }, L>) : Router<Assign<LocalsT, L>, AppT>;
    public use<H extends Handler<any, any, any>> (handler : H) : (
        H extends Handler<infer Req, infer Res, infer L> ?
        (
            CanHandle<Req, Res, {}, { locals : LocalsT }> extends true ?
            Router<Assign<LocalsT, L>, AppT> :
            never
        ) :
        never
    );
    public use<L extends object> (handler : Handler<{}, { locals : LocalsT }, L>) : any {
        const newHandler = wrapHandler(handler);
        this.rawRouter.use(newHandler);
        return this as any;
    }
    //Behaves differently from express' use(), will scope the middleware to just the route
    //and is applied to subsequent paths built by this router.
    public voidHandler (handler : RequestVoidHandler<{}, { locals : LocalsT }>) : Router<LocalsT, AppT>;
    public voidHandler (handler : ErrorVoidHandler<{}, { locals : LocalsT }>) : Router<LocalsT, AppT>;
    public voidHandler (handler : VoidHandler<{}, { locals : LocalsT }>) : Router<LocalsT, AppT>;
    public voidHandler<H extends VoidHandler<any, any>> (handler : H) : (
        H extends VoidHandler<infer Req, infer Res> ?
        (
            CanHandle<Req, Res, {}, { locals : LocalsT }> extends true ?
            Router<LocalsT, AppT> :
            never
        ) :
        never
    );
    public voidHandler (handler : VoidHandler<{}, { locals : LocalsT }>) : Router<LocalsT, AppT> {
        return new Router(
            this.rawRouter,
            this.rawApp,
            [...this.handlers, handler]
        );
    }
    //Behaves differently from express' use(), will scope the middleware to just the route
    //and is applied to subsequent paths built by this router.
    public handler<L extends object> (handler : RequestHandler<{}, { locals : LocalsT }, L>) : Router<Assign<LocalsT, L>, AppT>;
    public handler<L extends object> (handler : ErrorHandler<{}, { locals : LocalsT }, L>) : Router<Assign<LocalsT, L>, AppT>;
    public handler<L extends object> (handler : Handler<{}, { locals : LocalsT }, L>) : Router<Assign<LocalsT, L>, AppT>;
    public handler<H extends Handler<any, any, any>> (handler : H) : (
        H extends Handler<infer Req, infer Res, infer L> ?
        (
            CanHandle<Req, Res, {}, { locals : LocalsT }> extends true ?
            Router<Assign<LocalsT, L>, AppT> :
            never
        ) :
        never
    );
    public handler<L extends object> (handler : Handler<{}, { locals : LocalsT }, L>) : any {
        return new Router(
            this.rawRouter,
            this.rawApp,
            [...this.handlers, wrapHandler(handler)]
        );
    }

    public add<RouteT extends sd.Route<any>> (
        route: RouteT
    ) : (
        RouteBuilder<
            RouteToRequestData<RouteT>,
            RouteToResponseData<RouteT, LocalsT>,
            expressCore.IRouter
        >
    ) {
        let builder = RouteBuilder.Create<
            RouteT,
            LocalsT
        >(route).setRouter(this.rawRouter);
        for (let h of this.handlers) {
            builder = builder.voidHandler(h);
        }
        return builder;
    }

    public setApp (rawApp : expressCore.Express) : Router<LocalsT, expressCore.Express> {
        return new Router(
            this.rawRouter,
            rawApp
        );
    }
    public getApp () {
        return this.rawApp;
    }
    public build (this : Router<LocalsT, expressCore.Express>) : void {
        this.rawApp.use(this.rawRouter);
    }
}
