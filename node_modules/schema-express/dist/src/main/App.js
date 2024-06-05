"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Handler_1 = require("./Handler");
const Router_1 = require("./Router");
function toRouterMatcher(matcher, returnValue) {
    return (path, ...handlers) => {
        matcher(path, ...handlers);
        return returnValue;
    };
}
exports.toRouterMatcher = toRouterMatcher;
class App {
    constructor(rawApp) {
        if (rawApp == undefined) {
            rawApp = express();
        }
        this.rawApp = rawApp;
        this._dummyLocalsT;
        this.get = toRouterMatcher(rawApp.get.bind(rawApp), this);
        this.post = toRouterMatcher(rawApp.post.bind(rawApp), this);
        this.put = toRouterMatcher(rawApp.put.bind(rawApp), this);
        this.delete = toRouterMatcher(rawApp.delete.bind(rawApp), this);
        this.patch = toRouterMatcher(rawApp.patch.bind(rawApp), this);
        this.head = toRouterMatcher(rawApp.head.bind(rawApp), this);
        this.options = toRouterMatcher(rawApp.options.bind(rawApp), this);
        this.connect = toRouterMatcher(rawApp.connect.bind(rawApp), this);
    }
    getRawApp() {
        return this.rawApp;
    }
    useVoid(handler) {
        this.rawApp.use(handler);
        return this;
    }
    use(handler) {
        const newHandler = Handler_1.wrapHandler(handler);
        this.rawApp.use(newHandler);
        return this;
    }
    createRouter() {
        return Router_1.Router.Create()
            .setApp(this.rawApp);
    }
    useRouter(root, router) {
        const routerApp = router.getApp();
        if (routerApp != undefined && routerApp != this.rawApp) {
            throw new Error(`This router already has another app set`);
        }
        this.rawApp.use(root, router.getRawRouter());
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map