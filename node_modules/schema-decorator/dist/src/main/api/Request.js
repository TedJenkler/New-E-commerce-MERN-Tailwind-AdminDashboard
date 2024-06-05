"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
var ResponseType;
(function (ResponseType) {
    ResponseType[ResponseType["Normal"] = 0] = "Normal";
    ResponseType[ResponseType["Unmodified"] = 1] = "Unmodified";
    ResponseType[ResponseType["SyntacticError"] = 2] = "SyntacticError";
    ResponseType[ResponseType["Unauthorized"] = 3] = "Unauthorized";
    ResponseType[ResponseType["Forbidden"] = 4] = "Forbidden";
    ResponseType[ResponseType["NotFound"] = 5] = "NotFound";
    ResponseType[ResponseType["SemanticError"] = 6] = "SemanticError";
    ResponseType[ResponseType["TooManyRequests"] = 7] = "TooManyRequests";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
class Request {
    constructor(data, extraData) {
        this.data = data;
        this.extraData = extraData;
    }
    static Create(api, route) {
        return new Request({
            route: route,
        }, {
            api: api,
        });
    }
    setParam(param) {
        const d = types_1.toAssertDelegateExact(this.data.route.data.paramF);
        d("param", param);
        return new Request({
            ...this.data,
            param: param,
        }, this.extraData);
    }
    setQuery(query) {
        const d = types_1.toAssertDelegateExact(this.data.route.data.queryF);
        d("query", query);
        return new Request({
            ...this.data,
            query: query,
        }, this.extraData);
    }
    setBody(body) {
        const d = types_1.toAssertDelegateExact(this.data.route.data.bodyF);
        d("body", body);
        return new Request({
            ...this.data,
            body: body,
        }, this.extraData);
    }
    //Special, does not eliminate extra header keys,
    //But does not check their values, either
    setHeader(header) {
        const d = types_1.toAssertDelegateExact(this.data.route.data.headerF);
        d("header", header);
        return new Request({
            ...this.data,
            header: header,
        }, this.extraData);
    }
    setOnTransformBody(onTransformBody) {
        return new Request(this.data, {
            ...this.extraData,
            onTransformBody: onTransformBody,
        });
    }
    setOnInjectHeader(onInjectHeader) {
        return new Request(this.data, {
            ...this.extraData,
            onInjectHeader: onInjectHeader,
        });
    }
    chainOnInjectHeader(onInjectHeader) {
        if (this.extraData.onInjectHeader == undefined) {
            return this.setOnInjectHeader(onInjectHeader);
        }
        const previousOnInjectHeader = this.extraData.onInjectHeader;
        return new Request(this.data, {
            ...this.extraData,
            onInjectHeader: (route) => {
                const previousHeader = previousOnInjectHeader(route);
                const header = onInjectHeader(route);
                return {
                    ...previousHeader,
                    ...header,
                };
            },
        });
    }
    setOnTransformResponse(onTransformResponse) {
        return new Request(this.data, {
            ...this.extraData,
            onTransformResponse: onTransformResponse,
        });
    }
    setOnUnmodified(onUnmodified) {
        return new Request({
            ...this.data,
            onUnmodified: onUnmodified,
        }, this.extraData);
    }
    setOnSyntacticError(onSyntacticError) {
        return new Request({
            ...this.data,
            onSyntacticError: onSyntacticError,
        }, this.extraData);
    }
    setOnUnauthorized(onUnauthorized) {
        return new Request({
            ...this.data,
            onUnauthorized: onUnauthorized,
        }, this.extraData);
    }
    setOnForbidden(onForbidden) {
        return new Request({
            ...this.data,
            onForbidden: onForbidden,
        }, this.extraData);
    }
    setOnNotFound(onNotFound) {
        return new Request({
            ...this.data,
            onNotFound: onNotFound,
        }, this.extraData);
    }
    setOnSemanticError(onSemanticError) {
        return new Request({
            ...this.data,
            onSemanticError: onSemanticError,
        }, this.extraData);
    }
    setOnTooManyRequests(onTooManyRequests) {
        return new Request({
            ...this.data,
            onTooManyRequests: onTooManyRequests,
        }, this.extraData);
    }
    //Convenience
    setOnSyntacticOrSemanticError(onSyntacticOrSemanticErrorDelegate) {
        return new Request({
            ...this.data,
            onSyntacticError: onSyntacticOrSemanticErrorDelegate,
            onSemanticError: onSyntacticOrSemanticErrorDelegate,
        }, this.extraData);
    }
    getPath() {
        return RequestUtil.getPath(this);
    }
    async send() {
        return RequestUtil.send(this);
    }
    getDomain() {
        return this.extraData.api.getDomain();
    }
    getRoot() {
        return this.extraData.api.getRoot();
    }
    getBaseUrl() {
        return this.extraData.api.getBaseUrl();
    }
}
exports.Request = Request;
var RequestUtil;
(function (RequestUtil) {
    function getPath(req) {
        const data = req.data;
        const routeData = data.route.data;
        const param = (routeData.paramF == undefined) ?
            {} :
            types_1.toAssertDelegateExact(routeData.paramF)(`${routeData.path.getRouterPath()} : param`, data.param);
        const path = routeData.path.getCallingPath(param);
        return path;
    }
    RequestUtil.getPath = getPath;
    async function send(req) {
        const data = req.data;
        const routeData = data.route.data;
        const extraData = req.extraData;
        const method = data.route.getMethod();
        const path = getPath(req);
        let debugName = `${method} ${path}`;
        const query = (routeData.queryF == undefined) ?
            undefined :
            types_1.toAssertDelegateExact(routeData.queryF)(`${debugName} : query`, data.query);
        if (query != undefined && Object.keys(query).length > 0) {
            debugName += `?${JSON.stringify(query)}`;
        }
        const body = (routeData.bodyF == undefined) ?
            undefined :
            types_1.toAssertDelegateExact(routeData.bodyF)(`${debugName} : body`, data.body);
        //Headers are special
        const injectedHeader = (extraData.onInjectHeader == undefined) ?
            {} :
            await extraData.onInjectHeader(data.route);
        const header = (routeData.headerF == undefined) ?
            injectedHeader :
            {
                //Injected headers are applied first,
                //and may be over-written
                ...injectedHeader,
                //There may be extra header values given
                //that are not asserted
                ...data.header,
                //This assert delegate possibly modifies the values
                //of the header
                ...types_1.toAssertDelegateExact(routeData.headerF)(`${debugName} : header`, data.header),
            };
        const transformedBody = (extraData.onTransformBody == undefined) ?
            body :
            await extraData.onTransformBody(body);
        const config = {
            method: method,
            url: path,
            params: query,
            data: transformedBody,
            headers: header,
        };
        return req.extraData.api.instance.request(config)
            .then(async (result) => {
            result.type = ResponseType.Normal;
            if (routeData.responseF == undefined) {
                return result;
            }
            else {
                try {
                    const rawResponse = (extraData.onTransformResponse == undefined) ?
                        result.data :
                        await extraData.onTransformResponse(result.data, result);
                    const response = types_1.toAssertDelegateExact(routeData.responseF)(`${debugName} : response`, rawResponse);
                    result.data = response;
                    return result;
                }
                catch (err) {
                    if (err != undefined) {
                        err.response = result;
                    }
                    throw err;
                }
            }
        })
            .catch(async (err) => {
            if (err.config != undefined && err.response != undefined) {
                const response = err.response;
                switch (response.status) {
                    case 304: {
                        if (req.data.onUnmodified != undefined) {
                            response.type = ResponseType.Unmodified;
                            response.data = await req.data.onUnmodified(err);
                            return response;
                        }
                        break;
                    }
                    case 400: {
                        if (req.data.onSyntacticError != undefined) {
                            response.type = ResponseType.SyntacticError;
                            response.data = await req.data.onSyntacticError(err);
                            return response;
                        }
                        break;
                    }
                    case 401: {
                        if (req.data.onUnauthorized != undefined) {
                            response.type = ResponseType.Unauthorized;
                            response.data = await req.data.onUnauthorized(err);
                            return response;
                        }
                        break;
                    }
                    case 403: {
                        if (req.data.onForbidden != undefined) {
                            response.type = ResponseType.Forbidden;
                            response.data = await req.data.onForbidden(err);
                            return response;
                        }
                        break;
                    }
                    case 404: {
                        if (req.data.onNotFound != undefined) {
                            response.type = ResponseType.NotFound;
                            response.data = await req.data.onNotFound(err);
                            return response;
                        }
                        break;
                    }
                    case 422: {
                        if (req.data.onSemanticError != undefined) {
                            response.type = ResponseType.SemanticError;
                            response.data = await req.data.onSemanticError(err);
                            return response;
                        }
                        break;
                    }
                    case 429: {
                        if (req.data.onTooManyRequests != undefined) {
                            response.type = ResponseType.TooManyRequests;
                            response.data = await req.data.onTooManyRequests(err);
                            return response;
                        }
                        break;
                    }
                }
            }
            throw err;
        });
    }
    RequestUtil.send = send;
})(RequestUtil = exports.RequestUtil || (exports.RequestUtil = {}));
//# sourceMappingURL=Request.js.map