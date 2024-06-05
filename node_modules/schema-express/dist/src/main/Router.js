"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Handler_1 = require("./Handler");
const RouteBuilder_1 = require("./RouteBuilder");
//TODO support param(), they're pretty cool
class Router {
    constructor(rawRouter, rawApp, handlers = []) {
        this.handlers = [];
        this.rawRouter = rawRouter;
        this.rawApp = rawApp;
        this.handlers = handlers;
        this._dummyLocalsT;
        this._dummyAppT;
    }
    static Create(rawRouter) {
        if (rawRouter == undefined) {
            rawRouter = express.Router();
        }
        return new Router(rawRouter, undefined);
    }
    getRawRouter() {
        return this.rawRouter;
    }
    useVoid(handler) {
        this.rawRouter.use(handler);
        return this;
    }
    use(handler) {
        const newHandler = Handler_1.wrapHandler(handler);
        this.rawRouter.use(newHandler);
        return this;
    }
    voidHandler(handler) {
        return new Router(this.rawRouter, this.rawApp, [...this.handlers, handler]);
    }
    handler(handler) {
        return new Router(this.rawRouter, this.rawApp, [...this.handlers, Handler_1.wrapHandler(handler)]);
    }
    add(route) {
        let builder = RouteBuilder_1.RouteBuilder.Create(route).setRouter(this.rawRouter);
        for (let h of this.handlers) {
            builder = builder.voidHandler(h);
        }
        return builder;
    }
    setApp(rawApp) {
        return new Router(this.rawRouter, rawApp);
    }
    getApp() {
        return this.rawApp;
    }
    build() {
        this.rawApp.use(this.rawRouter);
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map