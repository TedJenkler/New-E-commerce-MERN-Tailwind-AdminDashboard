"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function isAsyncRequestJsonHandler(handler) {
    return handler.length <= 2;
}
exports.isAsyncRequestJsonHandler = isAsyncRequestJsonHandler;
//This lets us treat all handlers the same
function wrapAsyncJsonHandler(handler) {
    if (isAsyncRequestJsonHandler(handler)) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const json = yield handler(req, res);
                if (typeof json === "number") {
                    res.status(json).end();
                    next();
                }
                else if (json === undefined) {
                    next();
                }
                else {
                    res.json(json);
                    next();
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    else {
        return (err, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const json = yield handler(err, req, res);
                if (typeof json === "number") {
                    res.status(json).end();
                    next();
                }
                else if (json === undefined) {
                    next();
                }
                else {
                    res.json(json);
                    next();
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.wrapAsyncJsonHandler = wrapAsyncJsonHandler;
//# sourceMappingURL=AsyncJsonHandler.js.map