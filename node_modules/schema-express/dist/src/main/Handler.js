"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assign_1 = require("./assign");
function isRequestHandler(handler) {
    return handler.length <= 3;
}
exports.isRequestHandler = isRequestHandler;
//This lets us treat all handlers the same
function wrapHandler(handler) {
    if (isRequestHandler(handler)) {
        const requestVoidHandler = (req, res, next) => {
            const n = ((err, nxtLocals) => {
                //Overwrite res.locals
                assign_1.assign(res.locals, nxtLocals);
                next(err);
            });
            n.error = (err) => {
                if (err == undefined) {
                    next(new Error(`An unknown error occurred`));
                }
                else {
                    next(err);
                }
            };
            handler(req, res, n);
        };
        return requestVoidHandler;
    }
    else {
        const errorVoidHandler = (err, req, res, next) => {
            const n = ((err, nxtLocals) => {
                //Overwrite res.locals
                assign_1.assign(res.locals, nxtLocals);
                next(err);
            });
            n.error = (err) => {
                if (err == undefined) {
                    next(new Error(`An unknown error occurred`));
                }
                else {
                    next(err);
                }
            };
            handler(err, req, res, n);
        };
        return errorVoidHandler;
    }
}
exports.wrapHandler = wrapHandler;
//# sourceMappingURL=Handler.js.map