"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Handler_1 = require("./Handler");
const AsyncVoidHandler_1 = require("./AsyncVoidHandler");
const AsyncJsonHandler_1 = require("./AsyncJsonHandler");
const SchemaHandler_1 = require("./SchemaHandler");
//import {DefaultLocalsT} from "./DefaultLocalsT";
const ResponseHandler_1 = require("./ResponseHandler");
class RouteBuilder {
    constructor(route, handlers, rawRouter) {
        this.route = route;
        this.handlers = handlers;
        this.rawRouter = rawRouter;
        this._dummyRequestDataT;
        this._dummyResponseDataT;
        this._dummyRouterT;
    }
    static Create(route) {
        return new RouteBuilder(route, [], undefined);
    }
    voidHandler(handler) {
        return new RouteBuilder(this.route, [
            ...this.handlers,
            handler
        ], this.rawRouter);
    }
    handler(handler) {
        const newHandler = Handler_1.wrapHandler(handler);
        return new RouteBuilder(this.route, [
            ...this.handlers,
            newHandler
        ], this.rawRouter);
    }
    asyncVoidHandler(handler) {
        const newHandler = AsyncVoidHandler_1.wrapAsyncVoidHandler(handler);
        return new RouteBuilder(this.route, [
            ...this.handlers,
            newHandler
        ], this.rawRouter);
    }
    asyncJsonHandler(handler) {
        const newHandler = AsyncJsonHandler_1.wrapAsyncJsonHandler(handler);
        return new RouteBuilder(this.route, [
            ...this.handlers,
            newHandler
        ], this.rawRouter);
    }
    static GetRouterMatcher(router, method) {
        switch (method) {
            case "GET": {
                return router.get.bind(router);
            }
            case "POST": {
                return router.post.bind(router);
            }
            case "PUT": {
                return router.put.bind(router);
            }
            case "DELETE": {
                return router.delete.bind(router);
            }
            case "PATCH": {
                return router.patch.bind(router);
            }
            case "HEAD": {
                return router.head.bind(router);
            }
            case "OPTIONS": {
                return router.options.bind(router);
            }
            case "CONNECT": {
                return router.connect.bind(router);
            }
            default: {
                throw new Error(`Method ${method} not allowed`);
            }
        }
    }
    setRouter(rawRouter) {
        return new RouteBuilder(this.route, this.handlers, rawRouter);
    }
    build() {
        const matcher = RouteBuilder.GetRouterMatcher(this.rawRouter, this.route.getMethod());
        const handlers = [
            ResponseHandler_1.wrapResponseHandler(this.route),
            SchemaHandler_1.SchemaHandler.CreateParameter(this.route.data.paramF == undefined ?
                () => ({}) :
                this.route.data.paramF),
            SchemaHandler_1.SchemaHandler.CreateQuery(this.route.data.queryF == undefined ?
                () => ({}) :
                this.route.data.queryF),
            SchemaHandler_1.SchemaHandler.CreateBody(this.route.data.bodyF == undefined ?
                () => ({}) :
                this.route.data.bodyF),
            SchemaHandler_1.SchemaHandler.CreateHeader(this.route.data.headerF == undefined ?
                () => ({}) :
                this.route.data.headerF),
            ...this.handlers
        ];
        matcher(this.route.data.path.getRouterPath(), ...handlers);
    }
}
exports.RouteBuilder = RouteBuilder;
//# sourceMappingURL=RouteBuilder.js.map