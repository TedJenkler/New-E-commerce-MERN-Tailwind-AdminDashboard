"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
function wrapResponse(res, responseF) {
    const responseD = sd.toAssertDelegateExact(responseF == undefined ?
        () => ({}) :
        responseF);
    const originalJson = res.json.bind(res);
    res.json = (rawResponse) => {
        if (res.statusCode >= 400 && res.statusCode < 600) {
            //We are in an erroneous state, we don't validate anything for now
            return originalJson(rawResponse);
        }
        const cleanResponse = responseD("response", rawResponse);
        const processedResponse = sd.anyToRaw("response", cleanResponse);
        return originalJson(processedResponse);
    };
}
exports.wrapResponse = wrapResponse;
function wrapResponseHandler(route) {
    return (_req, res, next) => {
        wrapResponse(res, route.data.responseF);
        next();
    };
}
exports.wrapResponseHandler = wrapResponseHandler;
//# sourceMappingURL=ResponseHandler.js.map