"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("./Api");
const type_util_1 = require("@anyhowstep/type-util");
function toApi(routeMap) {
    let _ApiMixin = class _ApiMixin extends Api_1.Api {
    };
    _ApiMixin = __decorate([
        type_util_1.rename("ApiMixin")
    ], _ApiMixin);
    _ApiMixin.route = routeMap;
    for (let routeKey in routeMap) {
        _ApiMixin.prototype[routeKey] = function () {
            return this.request(routeMap[routeKey]);
        };
    }
    return _ApiMixin;
}
exports.toApi = toApi;
//# sourceMappingURL=to-api.js.map