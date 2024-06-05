"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAsyncRequestVoidHandler(handler) {
    return handler.length <= 2;
}
exports.isAsyncRequestVoidHandler = isAsyncRequestVoidHandler;
//This lets us treat all handlers the same
function wrapAsyncVoidHandler(handler) {
    if (isAsyncRequestVoidHandler(handler)) {
        return (req, res, next) => {
            handler(req, res)
                .then(next)
                .catch(next);
        };
    }
    else {
        return (err, req, res, next) => {
            handler(err, req, res)
                .then(next)
                .catch(next);
        };
    }
}
exports.wrapAsyncVoidHandler = wrapAsyncVoidHandler;
//# sourceMappingURL=AsyncVoidHandler.js.map