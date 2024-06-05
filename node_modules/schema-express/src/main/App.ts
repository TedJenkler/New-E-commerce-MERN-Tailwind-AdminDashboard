import * as express from "express";
import * as expressCore from "express-serve-static-core";
import {DefaultLocalsT} from "./DefaultLocalsT";
import {Handler, RequestHandler, ErrorHandler, wrapHandler} from "./Handler";
import {VoidHandler, RequestVoidHandler, ErrorVoidHandler} from "./VoidHandler";
import {Router} from "./Router";
import {Assign} from "./assign";
import {CanHandle} from "./CanHandle";

export interface RouterMatcher<LocalsT extends object, ReturnT> {
    (
        path : string,
        ...handlers : (RequestVoidHandler<{}, { locals : LocalsT }>)[]
    ) : ReturnT;
    (
        path : string,
        ...handlers : (ErrorVoidHandler<{}, { locals : LocalsT }>)[]
    ) : ReturnT;
    (
        path : string,
        ...handlers : (RequestHandler<{}, { locals : LocalsT }, any>)[]
    ) : ReturnT;
    (
        path : string,
        ...handlers : (ErrorHandler<{}, { locals : LocalsT }, any>)[]
    ) : ReturnT;
    (
        path : string,
        ...handlers : (
            VoidHandler<{}, { locals : LocalsT }> |
            Handler<{}, { locals : LocalsT }, any>
        )[]
    ) : ReturnT;
}

export function toRouterMatcher<LocalsT extends Object, ReturnT> (matcher : expressCore.IRouterMatcher<any>, returnValue : ReturnT) : RouterMatcher<LocalsT, ReturnT> {
    return (
        path : string,
        ...handlers : (
            VoidHandler<{}, { locals : LocalsT }>|
            Handler<{}, { locals : LocalsT }, any>
        )[]
    ) => {
        //TODO Investigate why `as any` is needed here
        matcher(path, ...handlers as any);
        return returnValue;
    };
}

export class App <LocalsT extends Object = DefaultLocalsT> {
    private rawApp : expressCore.Express;
    private _dummyLocalsT? : LocalsT;

    //If you really want to be *that* lazy
    //You don't really gain many benefits doign this, though
    public get     : RouterMatcher<LocalsT, this>;
    public post    : RouterMatcher<LocalsT, this>;
    public put     : RouterMatcher<LocalsT, this>;
    public delete  : RouterMatcher<LocalsT, this>;
    public patch   : RouterMatcher<LocalsT, this>;
    public head    : RouterMatcher<LocalsT, this>;
    public options : RouterMatcher<LocalsT, this>;
    public connect : RouterMatcher<LocalsT, this>;

    public constructor (rawApp? : expressCore.Express) {
        if (rawApp == undefined) {
            rawApp = express();
        }
        this.rawApp = rawApp;
        this._dummyLocalsT;

        this.get     = toRouterMatcher(rawApp.get.bind(rawApp), this);
        this.post    = toRouterMatcher(rawApp.post.bind(rawApp), this);
        this.put     = toRouterMatcher(rawApp.put.bind(rawApp), this);
        this.delete  = toRouterMatcher(rawApp.delete.bind(rawApp), this);
        this.patch   = toRouterMatcher(rawApp.patch.bind(rawApp), this);
        this.head    = toRouterMatcher(rawApp.head.bind(rawApp), this);
        this.options = toRouterMatcher(rawApp.options.bind(rawApp), this);
        this.connect = toRouterMatcher(rawApp.connect.bind(rawApp), this);
    }
    public getRawApp () {
        return this.rawApp;
    }
    public useVoid (handler : RequestVoidHandler<{}, { locals : LocalsT }>) : App<LocalsT>;
    public useVoid (handler : ErrorVoidHandler<{}, { locals : LocalsT }>) : App<LocalsT>;
    public useVoid (handler : VoidHandler<{}, { locals : LocalsT }>) : App<LocalsT>;
    public useVoid<H extends VoidHandler<any, any>> (handler : H) : (
        H extends VoidHandler<infer Req, infer Res> ?
        (
            CanHandle<Req, Res, {}, { locals : LocalsT }> extends true ?
            App<LocalsT> :
            never
        ) :
        never
    );
    public useVoid (handler : VoidHandler<{}, { locals : LocalsT }>) : App<LocalsT> {
        this.rawApp.use(handler);
        return this;
    }
    public use<L extends object> (handler : RequestHandler<{}, { locals : LocalsT }, L>) : App<Assign<LocalsT, L>>;
    public use<L extends object> (handler : ErrorHandler<{}, { locals : LocalsT }, L>) : App<Assign<LocalsT, L>>;
    public use<L extends object> (handler : Handler<{}, { locals : LocalsT }, L>) : App<Assign<LocalsT, L>>;
    public use<H extends Handler<any, any, any>> (handler: H) : (
        H extends Handler<infer Req, infer Res, infer L> ?
        (
            CanHandle<Req, Res, {}, { locals : LocalsT }> extends true ?
                App<Assign<LocalsT, L>> :
                never
        ) :
        never
    );
    public use<L extends object> (handler : Handler<{}, { locals : LocalsT }, L>) : any {
        const newHandler = wrapHandler(handler);
        this.rawApp.use(newHandler);
        return this as any;
    }
    public createRouter () : Router<LocalsT, expressCore.Express> {
        return Router.Create<LocalsT>()
            .setApp(this.rawApp);
    }
    public useRouter (root : string, router : Router<any, expressCore.Express|undefined>) {
        const routerApp = router.getApp();
        if (routerApp != undefined && routerApp != this.rawApp) {
            throw new Error(`This router already has another app set`);
        }
        this.rawApp.use(root, router.getRawRouter());
    }
}
